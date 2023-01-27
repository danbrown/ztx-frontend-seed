import { NextApiResponse, NextApiRequest } from "next";
import nextConnect from "next-connect";

export default nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { session } = req.body;
    const diff = session?.expiresAt
      ? // if session expiresAt is set, calculate the difference between the two
        (new Date(session.expiresAt).getTime() -
          new Date(session.createdAt).getTime()) /
        1000
      : // else set the default value for 7 days
        604800;

    try {
      // set the cookie
      res.setHeader(
        "Set-Cookie",

        `${process.env.NEXT_PUBLIC_COOKIE_DOMAIN_NAME}=${JSON.stringify(
          session
        )}; Max-Age=${diff}; Path=/; HttpOnly; Domain=${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN
            : "localhost"
        };`
      );

      // nookies.set(
      //   { res },
      //   process.env.NEXT_PUBLIC_COOKIE_DOMAIN_NAME,
      //   JSON.stringify(session),
      //   {
      //     // maxAge: diff, // 7 days by default
      //     path: "/",
      //     httpOnly: true,
      //     hostOnly: false,
      //     // sameSite: "strict",
      //     domain:
      //       process.env.NODE_ENV === "production"
      //         ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN
      //         : "localhost",
      //   }
      // );

      res.status(200).send("ok");
    } catch (e) {
      console.log(e);
      res.status(500).send("error");
    }
  }
);
