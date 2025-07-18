import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password && req.body.password !== user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  user.company = req.body.company || user.company;
  user.stream = req.body.stream || user.stream;
  user.bio = req.body.bio || user.bio;

  const updated = await user.save();
  res.json(updated);
};

export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePic = imageUrl;
    await user.save();

    res.json({ profilePic: imageUrl });
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

export const getAllAlumni = async (req, res) => {
  const alumni = await User.find({ role: "alumni" }).select("-password");
  res.json(alumni);
};

export const getAlumniById = async (req, res) => {
  const alumni = await User.findById(req.params.id).select("-password");
  if (!alumni || alumni.role !== "alumni") {
    return res.status(404).json({ message: "Alumni not found" });
  }
  res.json(alumni);
};
