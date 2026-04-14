import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const trainingLogs = [
            {
                id: "1",
                title: "Complete sit lessons",
                date: "2023-10-20",
                userName: "Long Lam",
                animalName: "Lucy",
                animalBreed: "Golden Retriever",
                hours: 20,
                description: "Lucy finishes the sit lessons very well today. Should give her a treat"
            },
            {
                id: "2",
                title: "Practice recall",
                date: "2023-10-21",
                userName: "Long Lam",
                animalName: "Lucy",
                animalBreed: "Golden Retriever",
                hours: 12,
                description: "Worked on recall and she improved a lot today"
            }
        ];

        return res.status(200).json({data : trainingLogs});
    }

    if (req.method === "POST") {
        const {title, date, animalId, hours, description} = req.body;

        if (!title || !date || !animalId || !hours || !description) {
            return res.status(400).json({messgae : "Missing required field"})
        }
        
        const newTrainingLog = {
            id: Date.now().toString(),
            title,
            date,
            animalId,
            hours,
            description,
        };

        console.log("New training log: ", newTrainingLog);
        return res.status(200).json({
            message: "Training log created successfully",
            data: newTrainingLog
        });
    }

    return res.status(405).json({message : "Method not allowed"});
}