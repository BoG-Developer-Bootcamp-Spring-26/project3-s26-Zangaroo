import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../server/mongodb/connectDb";
import User from "../../../server/mongodb/models/User";
import argon2 from "argon2"; 


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }
   const {email, password} = await req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Please fill in all fields" });
  }
 
  try {
      await connectDb();
  
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "User does not exist" });
      }
      const isMatch = await argon2.verify(user.password, password);
      if (!isMatch) {
        return res
        .status(400)
        .json({success: false, error: "password does not match"});
      }
      return res.status(200).json({success: true, userid: user._id, isAdmin: user.isAdmin,
      });

    } 
    catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, error: "Server error. Please try again." });
    }


}