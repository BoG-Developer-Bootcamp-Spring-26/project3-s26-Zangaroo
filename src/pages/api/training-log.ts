import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../server/mongodb/connectDb";
import TrainingLog from "../../../server/mongodb/models/Training-Log";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            await connectDb();
        
            const trainingLogs = await TrainingLog.find().populate("userId").populate("animalId");
            
            const formattedTrainingLogs = trainingLogs.map((log) => ({
                id: log._id.toString(),
                title: log.title,
                date: log.date,
                userName: log.userId.fullName,
                animalName: log.animalId.name,
                animalBreed: log.animalId.breed,
                hours: log.hours,
                description: log.description,
            }));

            return res.status(200).json({data : formattedTrainingLogs});
        } catch (e) {
            console.log(e);
            return res.status(500).json({message : "Server error"});
        }
    }

    if (req.method === "POST") {
        const {title, date, animalId, userId, hours, description} = req.body;

        if (!title || !date || !animalId || !userId || !hours || !description) {
            return res.status(400).json({message : "Missing required field"})
        }
        
        try {
            await connectDb();  

            const newTrainingLog = await TrainingLog.create({
                title,
                date,
                animalId,
                userId,
                hours,
                description,
            });

            return res.status(200).json({
                message: "Training log created successfully",
                data: newTrainingLog
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Server error" });
        }
    }

    return res.status(405).json({message : "Method not allowed"});
}