import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    console.log("Cadastro attempt:", body);
    // Here you can add actual registration logic
    res.status(200).json({ success: true, message: "Cadastro successful" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
