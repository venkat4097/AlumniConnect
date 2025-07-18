import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
  getAllAlumni,
  getAlumniById,
  uploadProfilePic,
} from "../controllers/userController.js";

const router = express.Router();

// 🔧 Multer setup (store file in memory for Cloudinary stream)
const upload = multer({ storage: multer.memoryStorage() });

// 🔐 Protected routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/alumni", protect, getAllAlumni);
router.get("/alumni/:id", protect, getAlumniById);

// 📤 Profile picture upload (Cloudinary)
router.patch("/profile-pic", protect, upload.single("profilePic"), uploadProfilePic);

export default router;
