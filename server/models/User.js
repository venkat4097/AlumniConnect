import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "alumni"],
      default: "student",
    },

    // Alumni-specific fields
    company: String,
    stream: String,
    bio: String,

    // Profile image (Cloudinary URL)
    profilePic: String,
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
connectionRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
