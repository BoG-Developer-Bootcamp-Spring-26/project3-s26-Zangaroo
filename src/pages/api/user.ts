import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../server/mongodb/connectDb";
import User from "../../../server/mongodb/models/User";
import argon2 from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(500).json({ success: false, error: "Method not allowed" });
  }

  const { fullName, email, password, confirmPassword, isAdmin } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ success: false, error: "Please fill in all fields" });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, error: "Passwords do not match" });
  }

  try {
    await connectDb();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }


    const hashedPassword = await argon2.hash(password);


    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      isAdmin: Boolean(isAdmin),
    });

 
   return res.status(200).json({success: true, userid: newUser._id, isAdmin: newUser.isAdmin, fullName: newUser.fullName,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Server error. Please try again." });
  }
}