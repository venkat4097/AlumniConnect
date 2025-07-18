import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getIncomingRequests,
  getConnections,
} from "../controllers/connectionController.js";

const router = express.Router();

router.post("/send/:alumniId", protect, sendRequest);
router.post("/accept/:studentId", protect, acceptRequest);
router.post("/reject/:studentId", protect, rejectRequest);
router.get("/requests", protect, getIncomingRequests);
router.get("/", protect, getConnections);

export default router;
