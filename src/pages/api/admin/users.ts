import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../../server/mongodb/connectDb";
import User from "../../../../server/mongodb/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    await connectDb();

    const users = await User.find({}, "fullName isAdmin"); 

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again.",
    });
  }
}