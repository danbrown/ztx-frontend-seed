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
    // get the token from the store, and the refresh and logout functions
    const { dispatchSessionRefresh, dispatchLogout, session } =
      zustandStore.getState();

    // initialize the token variables
    let accessToken = null,
      error = null,
      sessionToken = null;

    // & GET SESSION TOKENS (store or server cookies)
    //  if the session is already in the store, use it
    try {
      if (session) {
        accessToken = session.accessToken;
        sessionToken = session.token;
      }
      // else if the session is not in the store, get it from the server cookie
      else {
        // get the token from the store, and the refresh function
        const currentSessionRequest = await selfApiWorker.post(
          `/api/auth/session`
        );
        console.log(currentSessionRequest);

        if (currentSessionRequest.data) {
          accessToken = currentSessionRequest.data.accessToken;
          error = currentSessionRequest.data.error;
          sessionToken = currentSessionRequest.data.token;
        }
      }
    } catch (e) {
      console.log(e);
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
          console.log("Session expired, refreshing...");

          const refreshedSession = await dispatchSessionRefresh();

          // update the token in the header
          (config.headers as AxiosHeaders).set(
            "Authorization",
            `Bearer ${refreshedSession.accessToken}`
          );
        } catch (e) {
          console.log(e);

          console.log("Session refresh failed, logging out...");

          // if there is an error, log out and return the config
          dispatchLogout({ sessionToken });

          return Promise.reject({
            error: "Session refresh failed, user logged out",
          });
        }
      }
      // & TOKEN IS NOT EXPIRED, JUST USE THE CURRENT ONE
      else {
        // if the token is not expired, just add the current session token in the header
        (config.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${accessToken}`
        );
      }
    } else {
      // if there is an error, log out
      console.log(error);
    }

    // & RETURN THE CONFIG
    console.log(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// @ EXPORT DAFAULT API WORKER
export default apiWorker;
