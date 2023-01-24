import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export async function recaptchaVerifyApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;
  if (!token) res.status(400).send({ error: "Token invalid!" });

  try {
    const googleURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
    const response = await axios.post(googleURL);
    // expected return:
    // {
    //   "success": true|false,
    //   "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    //   "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
    //   "error-codes": [...]        // optional
    // }
    const { success } = response.data;

    if (success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({
        error: "Invalid Captcha. Try again",
        codes: response.data["error-codes"],
      });
    }
  } catch (e) {
    return res.status(500).send({ error: "Server Error" });
  }
}
