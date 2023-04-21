import apiWorker from "@utils/apiWorker";
import { NextApiRequest, NextApiResponse } from "next";

export default async function customRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = req.query.token as string;

      const response = await apiWorker.post("/auth/sessions/authorize", { token });
      const data = response.data;

      if (data.error || !data) {
        console.log("Error: ", data.error);
        res.status(500).json({ error: "Unable to authorize session" });
        reject(data.error);
      }

      res.status(200).json(data);
    }
    catch (e) {
      console.log("Error: ", e);
      res.status(500).json({ error: "Unable to authorize session" });
      reject(e);
    }
  });
}


