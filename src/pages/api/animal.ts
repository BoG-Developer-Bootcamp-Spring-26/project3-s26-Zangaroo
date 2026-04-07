import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../server/mongodb/connectDb";
import Animal from "../../../server/mongodb/models/Animal";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method === "GET") {
    try {
      await connectDb();
      const animals = await Animal.find();
      return res.status(200).json({ success: true, data: animals });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to fetch animals" });
    }
    }
  
    if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { name, breed, ownerId, hoursTrained, profilePicture } = req.body;

  if (!name || !breed || !ownerId || hoursTrained === undefined || !profilePicture) {
    return res
      .status(400)
      .json({ success: false, error: "Please fill in all fields" });
  }

  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return res.status(400).json({ success: false, error: "Invalid owner ID" });
  }

  if (typeof hoursTrained !== "number" || hoursTrained < 0) {
    return res.status(400).json({ success: false, error: "Hours trained must be a non-negative number" });
  }

  try {
    await connectDb();

    const newAnimal = await Animal.create({
      name,
      breed,
      owner: ownerId,
      hoursTrained,
      profilePicture
    });
    return res.status(201).json({ 
        success: true, data: newAnimal 
    });
  } catch (error) {
    return res
        .status(500)
        .json({ success: false, error: "Failed to create animal" });
  }
}