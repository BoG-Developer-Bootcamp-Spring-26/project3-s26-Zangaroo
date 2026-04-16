import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../server/mongodb/connectDb";
import Animal from "../../../server/mongodb/models/Animal";
import mongoose from "mongoose";
import User from "../../../server/mongodb/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "GET") {
    const { ownerId } = req.query;

    if (typeof ownerId !== "string" || ownerId.trim() === "") {
      return res.status(400).json({ 
        success: false, 
        error: "Owner ID is required and must be a non-empty string", 
      });
    }

    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid owner ID" 
      });
    }

    try {
      await connectDb();

      const animals = await Animal.find({ owner: ownerId }).populate("owner", "fullName");
      
      return res.status(200).json({ 
        success: true, 
        data: animals,
       });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: "Failed to fetch animals", 
      });
    }
  }

  if (req.method === "POST") {
    const { name, breed, ownerId, hoursTrained, profilePicture } = req.body;

    if (typeof name !== "string" ||
      name.trim() === "" ||
      typeof breed !== "string" ||
      breed.trim() === "" ||
      typeof ownerId !== "string" ||
      ownerId.trim() === "" ||
      hoursTrained === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Please fill in all  required fields" });
    }

  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid owner ID" });
  }

  if (typeof hoursTrained !== "number" || hoursTrained < 0) {
    return res.status(400).json({ 
      success: false, 
      error: "Hours trained must be a non-negative number", 
    });
  }

  try {
    await connectDb();

    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(400).json({ 
        success: false, 
        error: "Owner not found", 
      });
    }

    const newAnimal = await Animal.create({
      name: name.trim(),
      breed: breed.trim(),
      owner: ownerId,
      hoursTrained,
      profilePicture
    });
    
    return res.status(200).json({ 
        success: true, 
        data: newAnimal,
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: "Failed to create animal", 
    });
    }
  }

  if (req.method === "PATCH") {
    const {animalId, hoursTrained} = req.body;

    if (typeof animalId !== "string" || animalId.trim() === "" || hoursTrained === undefined
    ) {
      return res.status(400).json({ 
        success: false, 
        error: "Please fill in all required fields" 
      });
    }

    if (!mongoose.Types.ObjectId.isValid(animalId)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid animal ID" 
      });
    }

    if (typeof hoursTrained !== "number" || hoursTrained < 0) {
      return res.status(400).json({ 
        success: false, 
        error: "Hours trained must be a non-negative number", 
      });
    }

    try {
      await connectDb();

      const updatedAnimal = await Animal.findByIdAndUpdate(
        animalId,
        { hoursTrained },
        { new: true }
      );

      if (!updatedAnimal) {
        return res.status(404).json({ 
          success: false, 
          error: "Animal not found" 
        });
      }

      return res.status(200).json({ 
        success: true, 
        data: updatedAnimal,
       });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: "Failed to update animal", 
      });
    }
  }
  return res.status(405).json({ 
    success: false, 
    error: "Method not allowed" 
  });
}