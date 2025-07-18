import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "../config/axios";

const AlumniProfile = () => {
  const { id } = useParams();
  const { token,fetchAlumni } = useAuth();

  const [alumni, setAlumni] = useState(null);
  const [error, setError] = useState("");

    useEffect(() => {
  if (!token) return;

  (async () => {
    try {
      const res = await fetchAlumni(id);
      setAlumni(res);
    } catch (err) {
      setError("Failed to load alumni profile.");
    }
  })();
}, [id, token]);

if (error)
  return <p className="text-red-600 text-center mt-10">{error}</p>;
if (!alumni)
  return <p className="text-center mt-10">Loading...</p>;

return (
<div className="min-h-screen bg-[#121212] px-6 py-12 text-white font-sans">
  {/* Header */}
  {/* <div className="max-w-6xl mx-auto mb-12">
    <h1 className="text-4xl font-extrabold text-[#1DB954]">Alumni Profile</h1>
    <p className="text-gray-400 text-sm mt-1">Welcome back, {alumni.name.split(" ")[0]}</p>
  </div> */}

  {/* Profile Section */}
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
    
    {/* Profile Picture */}
    <div className="flex-shrink-0">
      {alumni.profilePic ? (
        <img
          src={alumni.profilePic}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-[#1DB954]"
        />
      ) : (
        <div className="w-40 h-40 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 text-sm">
          No Image
        </div>
      )}
    </div>

    {/* Info Section */}
    <div className="flex-1 w-full space-y-6">
      <div>
        <h2 className="text-xl text-gray-400 uppercase tracking-widest">Name</h2>
        <p className="text-2xl font-semibold text-white">{alumni.name}</p>
      </div>

      <div>
        <h2 className="text-xl text-gray-400 uppercase tracking-widest">Email</h2>
        <p className="text-white">{alumni.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl text-gray-400 uppercase tracking-widest">Company</h2>
          <p className="text-white">{alumni.company || "Not provided"}</p>
        </div>

        <div>
          <h2 className="text-xl text-gray-400 uppercase tracking-widest">Stream</h2>
          <p className="text-white">{alumni.stream || "Not provided"}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl text-gray-400 uppercase tracking-widest">Bio</h2>
        <p className="text-white whitespace-pre-line">{alumni.bio || "No bio available."}</p>
      </div>
    </div>
  </div>
</div>


);


};

export default AlumniProfile;
