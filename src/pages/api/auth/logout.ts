import { NextApiResponse, NextApiRequest } from "next";
import nextConnect from "next-connect";

export default nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      res.setHeader(
        "Set-Cookie",
        `${
          process.env.NEXT_PUBLIC_COOKIE_DOMAIN_NAME
        }=; Max-Age=0; Path=/; HttpOnly; Domain=${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN
            : "localhost"
        };`
      );

      res.status(200).send("ok");
    } catch (e) {
      console.log(e);
      res.status(401).send("error");
    }
  }
);
