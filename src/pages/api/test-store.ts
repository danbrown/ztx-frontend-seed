import { selfApiWorker } from "@utils/apiWorker";
import Cors from "cors";

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import nextConnect from "next-connect";

export default nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(zustandStore.getState());

    const currentSessionRequest = await axios.post(
      `http://localhost:5002/api/auth/session`
    );

    const currentSession = currentSessionRequest.data;
    console.log(currentSession);

    console.log(req.headers);

    // return the session
    res.status(200).json(currentSession);
  }
);
