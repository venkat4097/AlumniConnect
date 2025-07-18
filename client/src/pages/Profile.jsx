import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, token, updateProfile, logout, imageuploader } = useAuth();
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
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

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
      setEditMode(false);
    } else {
      setMessage(`❌ ${result.message}`);
    }
  };

  if (!user) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans">
      {/* Top Banner */}
      <div className="relative w-full h-60 md:h-72 bg-gradient-to-br from-[#1DB954] to-[#0f0f0f]">
        <div className="absolute bottom-[-50px] left-6 md:left-12 flex items-center gap-6">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 text-xl">
              No Image
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>
            <p className="text-gray-300 mt-1 text-sm capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="h-20"></div>

      <div className="px-6 md:px-12 py-10 space-y-6">
        {/* Toggle Edit Mode */}
        <button
          className="bg-[#1DB954] hover:bg-green-600 text-black font-semibold py-2 px-5 rounded-full transition duration-300"
          onClick={() => setEditMode((prev) => !prev)}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>

        <form className="space-y-6" onSubmit={handleUpdate}>
          <div>
            <label className="block text-gray-400 mb-1">Name</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-[#1e1e1e] border border-gray-600 p-2 rounded text-white"
              />
            ) : (
              <p className="text-xl">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#1e1e1e] border border-gray-600 p-2 rounded text-white"
              />
            ) : (
              <p className="text-xl">{user.email}</p>
            )}
          </div>

          {user.role === "alumni" && (
            <>
              <div>
                <label className="block text-gray-400 mb-1">Company</label>
                {editMode ? (
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full bg-[#1e1e1e] border border-gray-600 p-2 rounded text-white"
                  />
                ) : (
                  <p className="text-xl">{user.company || "Not provided"}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Stream</label>
                {editMode ? (
                  <input
                    type="text"
                    name="stream"
                    value={form.stream}
                    onChange={handleChange}
                    className="w-full bg-[#1e1e1e] border border-gray-600 p-2 rounded text-white"
                  />
                ) : (
                  <p className="text-xl">{user.stream || "Not provided"}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Bio</label>
                {editMode ? (
                  <textarea
                    name="bio"
                    rows="4"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full bg-[#1e1e1e] border border-gray-600 p-2 rounded text-white"
                  />
                ) : (
                  <p className="text-lg whitespace-pre-line">
                    {user.bio || "No bio available."}
                  </p>
                )}
              </div>
            </>
          )}

          {editMode && (
            <button
              type="submit"
              className="mt-4 bg-[#1DB954] hover:bg-green-600 text-black font-semibold py-2 px-6 rounded-full"
            >
              Save Changes
            </button>
          )}

          {message && (
            <p className="mt-2 text-sm font-medium text-yellow-400">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
