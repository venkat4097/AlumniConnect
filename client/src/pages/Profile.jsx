import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

const Profile = () => {
  const { user, token, updateProfile, logout ,imageuploader} = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    stream: "",
    bio: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    // Prefill form from context user
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      company: user.company || "",
      stream: user.stream || "",
      bio: user.bio || "",
    });
  }, [user, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await updateProfile(form);
    if (result.success) {
      setMessage("✅ Profile updated successfully!");
    } else {
      setMessage(`❌ ${result.message}`);
    }
  };




  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
  <div className="min-h-screen bg-gray-50 text-gray-800">
    {/* 🔝 Header */}
    <header className="bg-white shadow py-4 px-8 border-b">
      <h1 className="text-2xl font-bold text-green-700">Edit My Profile</h1>
    </header>

    {/* 🧾 Profile Form */}
    <main className="px-8 py-10 max-w-4xl mx-auto">
      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-gray-200 p-8 rounded-lg shadow-sm"
      >
        {/* 👤 Profile Picture */}
        <div className="col-span-full flex flex-col items-center gap-3 mb-6">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}
          <input
            type="file"
            onChange={(e) => imageuploader(e.target.files[0], FormData)}
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        {/* 💬 Message */}
        {message && (
          <div className="col-span-full text-center">
            <p
              className={`text-sm font-medium ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          </div>
        )}

        {/* 📝 Name & Email */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        {/* 🏢 Alumni Fields */}
        {user.role === "alumni" && (
          <>
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            />

            <input
              type="text"
              name="stream"
              placeholder="Stream"
              value={form.stream}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            />

            <textarea
              name="bio"
              placeholder="Bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="md:col-span-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </>
        )}

        {/* ✅ Submit */}
        <div className="col-span-full">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Update Profile
          </button>
        </div>
      </form>
    </main>
  </div>
);

};

export default Profile;
