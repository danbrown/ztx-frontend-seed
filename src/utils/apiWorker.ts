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
    // get the token from the store, and the refresh function
    const currentSessionRequest = await selfApiWorker.post(`/api/auth/session`);
    console.log(currentSessionRequest);

    const {
      accessToken,
      error,
      token: sessionToken,
    } = currentSessionRequest.data;
    const { dispatchSessionRefresh, dispatchLogout } = zustandStore.getState();

    if (!error) {
      // decode the token looking for the expiration date
      const { exp: tokenExpDate } = decodeJwt(accessToken);

      // get the current date
      const currentDate = new Date().getTime() / 1000;

      // if the token is expired, refresh it, refreshedSession will be already updated in the store, so we can get the new token from there
      if (currentDate > tokenExpDate) {
        console.log("Session expired, refreshing...");

        const refreshedSession = await dispatchSessionRefresh();
        if (refreshedSession?.error) {
          console.log("Session refresh failed, logging out...");
          console.log(refreshedSession);

          // dispatchLogout({ sessionToken });

          return Promise.reject(refreshedSession);
        }

        // update the token in the header
        (config.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${refreshedSession.accessToken}`
        );
      } else {
        // update the token in the header
        (config.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${accessToken}`
        );
      }
    } else {
      console.log(error);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// @ EXPORT DAFAULT API WORKER
export default apiWorker;
