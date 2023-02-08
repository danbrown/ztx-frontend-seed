import { NextApiRequest, NextApiResponse } from "next";

type RestHttpMethods = "GET" | "POST" | "PUT" | "DELETE";

export default async function customRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise(async (resolve, reject) => {
    // route is a array of path segments
    // e.g. /hello/me  = ['hello', 'me']
    const route = req.query.route as string[];
    const routePath = "/" + route.join("/");

    const method = req.method.toUpperCase() as RestHttpMethods;

    // Headers setup
    let headers: any = {
      // If the content type is not set, then default to application/json
      "Content-Type": req.headers["content-type"] || "application/json",
      "Access-Control-Allow-Origin":
        req.headers["access-control-allow-origin"] || "*",

      // The api gateway requires a client id and secret to be sent in the header
      "Proxy-Authorization": `Basic ${Buffer.from(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_CLIENT_ID}:${process.env.API_GATEWAY_CLIENT_SECRET}`
      ).toString("base64")}`,

      // get the token from the header, it can be undefined
      token: req?.headers?.token || undefined,
    };

    // Compile the body
    const filteredBody =
      // If the method is GET, then there is no body
      method === "GET"
        ? undefined
        : // If the body is not null, undefined, or empty string, then stringify it
        req.body !== null && req.body !== undefined && req.body !== ""
        ? typeof req.body === "object"
          ? JSON.stringify(req.body)
          : // If the body is a string, then just use it
          typeof req.body === "string"
          ? req.body
          : undefined
        : undefined;

    // + FETCH THE API GATEWAY
    fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/${routePath}`, {
      method: method,
      headers: headers,
      body: filteredBody,
    })
      .then(async (response) => {
        // console.log("Response: ", response);

        try {
          const json = (await response.json()) || {};

          res.status(response?.status || 500).json(json);
          resolve(json);
        } catch {
          res.status(response?.status || 500).json({});
          resolve({});
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        res.status(500).json({ error });
        reject(error);
      });
  });
}
