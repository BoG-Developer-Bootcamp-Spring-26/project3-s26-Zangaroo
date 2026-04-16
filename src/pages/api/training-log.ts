import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../server/mongodb/connectDb";
import TrainingLog from "../../../server/mongodb/models/Training-Log";
import "../../../server/mongodb/models/Animal";
import "../../../server/mongodb/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { userId , id} = req.query;
        
        try {
            await connectDb();

            if (typeof id === "string" && id.trim() !== "") {
                const trainingLog = await TrainingLog.findById(id)
                    .populate("userId")
                    .populate("animalId");

                if (!trainingLog) {
                    return res.status(400).json({ message: "Training log not found" });
                }

                const formattedTrainingLog = {
                    id: trainingLog._id.toString(),
                    title: trainingLog.title,
                    date: trainingLog.date,
                    userId: trainingLog.userId._id.toString(),
                    animalId: trainingLog.animalId._id.toString(),
                    userName: trainingLog.userId.fullName,
                    animalName: trainingLog.animalId.name,
                    animalBreed: trainingLog.animalId.breed,
                    hours: trainingLog.hours,
                    description: trainingLog.description,
                };

                return res.status(200).json({ data: formattedTrainingLog });
            }

            const filter =
                typeof userId === "string" && userId.trim() !== ""
                    ? { userId }
                    : {};
        
            // Sort by newest created records first. `_id` works for older documents
            // that were created before timestamps were enabled.
            const trainingLogs = await TrainingLog.find(filter)
                .sort({ _id: -1 })
                .populate("userId")
                .populate("animalId");
            
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

        if (!title || !date || !animalId || !userId || hours === undefined || description === undefined || description.trim() === "") {
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

    if (req.method="PATCH") {
        console.log("PATCH BODY:", req.body);

        const {id, title, date, animalId, userId, hours, description} = req.body;

        if (!id || !title || !animalId || !userId || hours === undefined || description === undefined || description.trim() === "") {
            return res.status(400).json({message : "Missing required field"})
        }

        try {

            await connectDb();
            
            const existingTrainingLog = await TrainingLog.findById(id);

            if (!existingTrainingLog) {
                return res.status(400).json({ message: "Training log not found" });
            }

            if (existingTrainingLog.userId.toString() !== userId) {
                return res.status(400).json({ message: "User does not match training log" });
            }

            existingTrainingLog.title = title;
            existingTrainingLog.animalId = animalId;
            existingTrainingLog.hours = hours;
            existingTrainingLog.description = description;

            await existingTrainingLog.save();

            return res.status(200).json({
                message: "Training log updated successfully",
                data: existingTrainingLog,
            });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Server error" });
        }
    }

    return res.status(405).json({message : "Method not allowed"});
}
