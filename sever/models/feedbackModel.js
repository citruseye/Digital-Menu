import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const feedbackModel = mongoose.models.feedback || mongoose.model("feedback",feedbackSchema)

export default feedbackModel;
