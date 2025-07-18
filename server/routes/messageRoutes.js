import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

/**
 * @route   GET /api/messages/:userId
 * @desc    Get all messages between current user and specified user
 * @access  Private
 */
router.get("/:userId", protect, getMessages);

/**
 * @route   POST /api/messages/
 * @desc    Send a message (REST fallback)
 * @access  Private
 */
router.post("/", protect, sendMessage);

export default router;
