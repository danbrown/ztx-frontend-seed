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
// const apiWorker = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
//   headers: {
//     "Content-Type": "application/json",
//     // "Access-Control-Allow-Origin": "*",
//     // Authorization: "",
//     Authorization: `Basic ${Buffer.from(
//       `${process.env.NEXT_PUBLIC_API_GATEWAY_CLIENT_ID}:${process.env.NEXT_PUBLIC_API_GATEWAY_CLIENT_SECRET}`
//     ).toString("base64")}`,
//   },
// });

// @ API WORKER INTERCEPTORS

// + TOKEN REFRESH INTERCEPTOR
// apiWorker.interceptors.request.use(
//   async (config) => {
//     const DEBUG = false; // true to enable alert and console logs

//     DEBUG && alert("Intercepting request: " + JSON.stringify(config.url));

//     // get the token from the store, and the refresh and logout functions
//     const { dispatchSessionRefresh, dispatchLogout } = zustandStore.getState();

//     // & TRY TO REFRESH THE TOKEN
//     try {
//       // ignore the refresh call if it's a refresh call and there is no error
//       if (config.url?.includes("refresh") === false) {
//         const refreshedSession = await dispatchSessionRefresh();

//         if (refreshedSession.error) {
//           // if there is an error, log out
//           DEBUG && console.log(refreshedSession.error);
//           DEBUG &&
//             alert(
//               "There is an error, or skipping" +
//                 JSON.stringify(refreshedSession.error)
//             );

//           // & LOGOUT
//           dispatchLogout();
//           return Promise.reject(refreshedSession.error);
//         }

//         // if the token is not expired, just add the current session token in the header
//         (config.headers as AxiosHeaders).set(
//           "token",
//           `${refreshedSession?.accessToken}`
//         );
//       } else {
//         // if there is an error, log out
//         DEBUG && alert("Is a refresh call, skipping");
//       }
//     } catch (error) {
//       // if there is an error, log out
//       DEBUG && console.log(error);
//       DEBUG && alert("There is an error, or skipping" + JSON.stringify(error));
//     }

//     // & RETURN THE CONFIG
//     DEBUG && console.log(config);
//     DEBUG && alert("Final Config: " + JSON.stringify(config));
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// @ EXPORT DAFAULT API WORKER
// export default apiWorker;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const baseURL =
  `${process.env.NEXT_PUBLIC_SELF_URL}/api/gateway` || "http://localhost";

export const apiWorker = (
  method: HttpMethod,
  path: string,
  body: any = {},
  headers: any = {}
) => {
  return fetch(`${baseURL}${path}`, {
    method,
    headers: new Headers({
      "Content-Type": "application/json",
      ...headers,
    }),
    body:
      method === "GET"
        ? undefined
        : body !== null
        ? JSON.stringify(body)
        : undefined,
  });
};
