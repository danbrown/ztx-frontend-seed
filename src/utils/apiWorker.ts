import { zustandStore } from "@zustand/ZustandStoreProvider";
import axios, { AxiosHeaders } from "axios";

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
    token: "",
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

    // & TRY TO REFRESH THE TOKEN
    try {
      // ignore the refresh call if it's a refresh call and there is no error
      if (config.url?.includes("refresh") === false) {
        const refreshedSession = await dispatchSessionRefresh();

        if (refreshedSession.error) {
          // if there is an error, log out
          DEBUG && console.log(refreshedSession.error);
          DEBUG &&
            alert(
              "There is an error, or skipping" +
                JSON.stringify(refreshedSession.error)
            );

          // & LOGOUT
          dispatchLogout();
          return Promise.reject(refreshedSession.error);
        }

        // if the token is not expired, just add the current session token in the header
        (config.headers as AxiosHeaders).set(
          "token",
          `Bearer ${refreshedSession?.accessToken}`
        );
      } else {
        // if there is an error, log out
        DEBUG && alert("Is a refresh call, skipping");
      }
    } catch (error) {
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

export default apiWorker;

// // @ ACTUAL API WORKER (default, for api calls to the api gateway)
// export const apiWorker = async (
//   method: RestHttpMethods,
//   path: string,
//   body: any = {},
//   headers: any = {}
// ): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     const routePath = `${process.env.NEXT_PUBLIC_SELF_URL}/api/gateway${path}`;

//     let headersCombo = {
//       "Content-Type": "application/json",
//       ...headers,
//     };

//     // do refresh
//     headersCombo = await refreshInterceptor({
//       routePath,
//       headers,
//     });

//     await fetch(routePath, {
//       method,
//       headers: new Headers({
//         ...headersCombo,
//       }),
//       body:
//         method === "GET"
//           ? undefined
//           : body !== null
//           ? JSON.stringify(body)
//           : undefined,
//     })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// // @ API WORKER INTERCEPTORS

// // + TOKEN REFRESH INTERCEPTOR
// const refreshInterceptor = async ({ routePath, headers }) => {
//   return new Promise(async (resolve, reject) => {
//     const DEBUG = true; // true to enable console logs

//     const authorizationHeaderName = "token";

//     let headersCombo = {
//       ...headers,
//     };

//     DEBUG && console.log("ApiWorker: Intercepting request: " + routePath);

//     try {
//       // get the token from the store, and the refresh and logout functions
//       const { dispatchSessionRefresh, dispatchLogout } =
//         zustandStore.getState();

//       // & TRY TO REFRESH THE TOKEN
//       // ignore the refresh call if it's a refresh call and there is no error
//       if (routePath?.includes("refresh") === false) {
//         const refreshedSession = await dispatchSessionRefresh();
//         DEBUG && console.log("ApiWorker: Route path refresh: ", routePath);

//         // if there is an error, log out and send default headers
//         if (refreshedSession.error) {
//           DEBUG &&
//             console.log("ApiWorker: There is an error refreshing: ", routePath);
//           DEBUG && console.log(refreshedSession.error);
//           await dispatchLogout();
//           return resolve(headersCombo);
//         }

//         // if the token is not expired, just add the current session accessToken in the header
//         return resolve({
//           [authorizationHeaderName]: `Bearer ${refreshedSession?.accessToken}`,
//           ...headers,
//         });
//       }

//       // & IF IT'S A REFRESH CALL, JUST RETURN THE HEADERS
//       else {
//         DEBUG && console.log("ApiWorker: Is a refresh call, skipping");
//         return resolve(headersCombo);
//       }
//     } catch (error) {
//       // if there is an error, log out
//       DEBUG && console.log("ApiWorker: ", error);

//       // & RETURN THE HEADERS CONFIG
//       return resolve(headersCombo);
//     }
//   });
// };
