import apiWorker from "@utils/apiWorker";
import { zustandStore } from "@zustand/ZustandStoreProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function customRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // route is a array of path segments
  // e.g. /hello/me  = ['hello', 'me']
  const route = req.query.route as string[];
  const routePath = "/" + route.join("/");

  const method = req.method.toLowerCase() as "get" | "post" | "put" | "delete";

  // current session cookie
  const session = JSON.parse(
    req.cookies[process.env.NEXT_PUBLIC_COOKIE_DOMAIN_NAME]
  );

  console.log(routePath);

  // Headers setup
  let headers: any = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",

    // The api gateway requires a client id and secret to be sent in the header
    Authorization: `Basic ${Buffer.from(
      `${process.env.API_GATEWAY_CLIENT_ID}:${process.env.API_GATEWAY_CLIENT_SECRET}`
    ).toString("base64")}`,
  };

  // + TOKEN REFRESH INTERCEPTOR
  headers = await refreshInterceptor({
    routePath,
    headers,
    session,
  });

  console.log(req.body);

  fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}${routePath}`, {
    method: method,
    headers: headers,
    body:
      method !== "get"
        ? req.body
          ? JSON.stringify(req.body)
          : undefined
        : undefined,
  })
    .then(async (response) => {
      console.log("Response: ", response);

      try {
        const json = (await response.json()) || {};

        res.status(response?.status || 500).json(json);
      } catch {
        res.status(response?.status || 500).json({});
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({ error });
    });
}

// + TOKEN REFRESH INTERCEPTOR
const refreshInterceptor = async ({ routePath, headers, session }) => {
  return new Promise(async (resolve, reject) => {
    const DEBUG = false; // true to enable console logs

    if (!session) {
      DEBUG && console.log("No session, skipping");

      // & RETURN THE HEADERS CONFIG
      return resolve(headers);
    }

    let headersCombo = {
      ...headers,
      token: `${session?.accessToken}`,
    };
    console.log(headersCombo);

    console.log("Intercepting request: " + routePath);

    try {
      // get the token from the store, and the refresh and logout functions
      const { dispatchSessionRefresh, dispatchLogout } =
        zustandStore.getState();

      // & TRY TO REFRESH THE TOKEN
      // ignore the refresh call if it's a refresh call and there is no error
      if (routePath?.includes("refresh") === false) {
        const refreshedSession = await dispatchSessionRefresh();
        // session

        if (refreshedSession.error) {
          // if there is an error, log out
          DEBUG && console.log(refreshedSession.error);
          DEBUG &&
            console.log(
              "There is an error, or skipping" +
                JSON.stringify(refreshedSession.error)
            );

          // & LOGOUT
          await dispatchLogout();
          // return reject(refreshedSession.error);

          // & RETURN THE HEADERS CONFIG
          return resolve(headers);
        }

        // if the token is not expired, just add the current session accessToken in the header
        headersCombo = {
          ...headers,
          token: `${refreshedSession?.accessToken}`,
        };

        // & RETURN THE HEADERS CONFIG
        return resolve(headersCombo);
      } else {
        // if there is an error, log out
        DEBUG && console.log("Is a refresh call, skipping");

        // & RETURN THE HEADERS CONFIG
        return resolve(headersCombo);
      }
    } catch (error) {
      // if there is an error, log out
      DEBUG && console.log(error);

      // & RETURN THE HEADERS CONFIG
      return resolve(headers);
    }
  });
};
