import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });
    // Here you can add actual authentication logic
    res.status(200).json({ success: true, message: "Login successful" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
