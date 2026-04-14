import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../../server/mongodb/connectDb";
import Animal from "../../../../server/mongodb/models/Animal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
    try {
        await connectDb();
        const animals = await Animal.find({}).populate("owner", "fullName");
        return res.status(200).json({ success: true, data: animals });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Failed to retrieve animals" });
    }
}