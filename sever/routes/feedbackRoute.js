import express from "express"
import { createFeedback,getFeedbackByOrderId } from "../controllers/feedbackController.js"
import authMiddleware from '../middleware/auth.js'

const feedbackRouter = express.Router();

feedbackRouter.post('/create', authMiddleware,createFeedback);
feedbackRouter.get('/:orderId',getFeedbackByOrderId);

export default feedbackRouter;


