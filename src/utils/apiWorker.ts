import { zustandStore } from "@zustand/ZustandStoreProvider";
import axios, { AxiosHeaders } from "axios";
import { decodeJwt } from "./decodeJwt";

// @ SELF API WORKER (for self api calls in NextJS api)
export const selfApiWorker = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SELF_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// @ ACTUAL API WORKER (default, for api calls to the api gateway)
const apiWorker = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "",
  },
});

// @ API WORKER INTERCEPTORS

// + TOKEN REFRESH INTERCEPTOR
apiWorker.interceptors.request.use(
  async (config) => {
    const DEBUG = false; // true to enable alert and console logs

    DEBUG && alert("Intercepting request: " + JSON.stringify(config.url));

    // get the token from the store, and the refresh and logout functions
    const { dispatchSessionRefresh, dispatchLogout } = zustandStore.getState();

    // initialize the token variables
    let accessToken = null,
      error = null,
      sessionToken = null;

    // & GET SESSION TOKENS (server cookies)
    try {
      // get the session from the server
      // avoid using the stored session because it don't update between tabs
      const currentSessionRequest = await selfApiWorker.post(
        `/api/auth/session`
      );
      DEBUG && console.log(currentSessionRequest);
      DEBUG &&
        alert(
          "Session from server: " + JSON.stringify(currentSessionRequest.data)
        );

      if (currentSessionRequest.data) {
        accessToken = currentSessionRequest.data.accessToken;
        error = currentSessionRequest.data.error;
        sessionToken = currentSessionRequest.data.token;
      }
    } catch (e) {
      DEBUG && console.log(e);
      DEBUG && alert("Error getting session from server: " + JSON.stringify(e));
    }

    // & TRY TO REFRESH THE TOKEN
    // ignore the refresh call if it's a refresh call and there is no error
    if (!error && config.url?.includes("/refresh") === false) {
      // decode the token looking for the expiration date
      const { exp: tokenExpDate } = decodeJwt(accessToken);

      // consider the refresh token expired it's 5 minutes before the actual expiration date
      const tokenExpDateWithRefresh = tokenExpDate - 300;
      const currentDate = new Date().getTime() / 1000;

      // if the token is expired, refresh it, refreshedSession will be already updated in the store, so we can get the new token from there
      if (currentDate > tokenExpDateWithRefresh) {
        // & REFRESH THE TOKEN
        try {
          DEBUG && console.log("Session expired, refreshing...");
          DEBUG && alert("Session expired, refreshing...");

          const refreshedSession = await dispatchSessionRefresh();

          DEBUG && console.log(refreshedSession);
          DEBUG &&
            alert("Refreshed session: " + JSON.stringify(refreshedSession));

          // update the token in the header
          (config.headers as AxiosHeaders).set(
            "Authorization",
            `Bearer ${refreshedSession.accessToken}`
          );
        } catch (e) {
          DEBUG && console.log(e);
          DEBUG && console.log("Session refresh failed, logging out...");
          DEBUG &&
            alert("Session refresh failed, logging out..." + JSON.stringify(e));

          // if there is an error, log out and return the config
          dispatchLogout({ sessionToken });

          return Promise.reject({
            error: "Session refresh failed, user logged out",
          });
        }
      }
      // & TOKEN IS NOT EXPIRED, JUST USE THE CURRENT ONE
      else {
        DEBUG &&
          alert(
            "Token is not expired, there is still " +
              ((tokenExpDateWithRefresh - currentDate) / 60).toFixed(2) +
              " minutes left"
          );

        // if the token is not expired, just add the current session token in the header
        (config.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${accessToken}`
        );
      }
    } else {
      // if there is an error, log out
      DEBUG && console.log(error);
      DEBUG && alert("There is an error, or skipping" + JSON.stringify(error));
    }

    // & RETURN THE CONFIG
    DEBUG && console.log(config);
    DEBUG && alert("Final Config: " + JSON.stringify(config));
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// @ EXPORT DAFAULT API WORKER
export default apiWorker;
