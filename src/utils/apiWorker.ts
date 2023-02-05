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
  baseURL: `${process.env.NEXT_PUBLIC_SELF_URL}/api/gateway`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// @ API WORKER INTERCEPTORS

// + TOKEN REFRESH INTERCEPTOR
apiWorker.interceptors.request.use(
  async (config) => {
    const DEBUG = false; // true to enable alert and console logs
    DEBUG && alert("Intercepting request: " + JSON.stringify(config.url));

    // get the refresh and logout functions  from the store,
    const { dispatchSessionRefresh, dispatchLogout } = zustandStore.getState();

    // & TRY TO REFRESH THE TOKEN
    try {
      // ignore the refresh if it's a refresh route call
      if (config.url?.includes("refresh") === false) {
        const refreshedSession = await dispatchSessionRefresh();

        (config.headers as AxiosHeaders).set(
          "token",
          `Bearer ${refreshedSession?.accessToken}`
        );
      } else {
        DEBUG && alert("Is a refresh call, skipping");
      }
    } catch (error) {
      // if there is an error, log out
      DEBUG && console.log("Refresh Error, logging out", error);
      dispatchLogout();
    }

    DEBUG && console.log("FinalConfig: ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// @ EXPORT DAFAULT API WORKER
export default apiWorker;
