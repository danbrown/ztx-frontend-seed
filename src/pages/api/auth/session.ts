import { NextApiResponse, NextApiRequest } from "next";
import nextConnect from "next-connect";

export default nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = req.cookies;
    const session = cookies[process.env.NEXT_PUBLIC_COOKIE_DOMAIN_NAME];

    if (!session)
      return res.status(200).send({ error: { message: "No session found" } });

    return res.status(200).send({ ...JSON.parse(session) });
  }
);
