import mongoose from "mongoose";

const TrainingLogSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

export default mongoose.models.TrainingLog || mongoose.model("TrainingLog", TrainingLogSchema);