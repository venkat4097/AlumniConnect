import dotenv from "dotenv";
dotenv.config(); // Ensure .env is loaded before anything else

import { v2 as cloudinary } from "cloudinary";

// 🔐 Cloudinary config from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📤 Upload function
export const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "alumni-portal", // Optional: helps organize in Cloudinary
      },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary Upload Error:", error.message);
          return reject(new Error("Cloudinary upload failed"));
        }

        // ✅ Return only the secure image URL
        resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
};
