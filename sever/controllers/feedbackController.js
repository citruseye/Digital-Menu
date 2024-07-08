import feedbackModel from "../models/feedbackModel.js";
import orderModel from "../models/orderModel.js";

const createFeedback = async (req, res) => {
    const { orderId, feedback } = req.body;
    const userId = req.body.userId; 
    try {
        const order = await orderModel.findById(orderId);
        const newFeedback = new feedbackModel({
            orderId,
            userId,
            feedback,
        });

        await newFeedback.save();
        return res.status(201).json({ message: "Feedback created successfully", data: newFeedback });
    } catch (error) {
        console.error("Error creating feedback:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
  
const getFeedbackByOrderId = async (req, res) => {
    const { orderId } = req.params;

    if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
    }

    try {
        const feedback = await feedbackModel.findOne({ orderId }).populate('userId', 'name email');
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found for this order ID" });
        }

        return res.status(200).json({ message: "Feedback retrieved successfully", data: feedback });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

  export {createFeedback,getFeedbackByOrderId}
