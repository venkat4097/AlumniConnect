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
  <div className="max-w-4xl mx-auto mt-12 px-6 sm:px-10 py-8 bg-white rounded-2xl shadow-md border border-gray-200">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        {alumni.profilePic ? (
          <img
            src={alumni.profilePic}
            alt={`${alumni.name}'s Profile`}
            className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{alumni.name}</h1>
        <p className="text-gray-500 mb-6">Alumni Profile Overview</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium text-gray-600">Email</p>
            <p>{alumni.email}</p>
          </div>

          <div>
            <p className="font-medium text-gray-600">Company</p>
            <p>{alumni.company || "N/A"}</p>
          </div>

          <div>
            <p className="font-medium text-gray-600">Stream</p>
            <p>{alumni.stream || "N/A"}</p>
          </div>

          <div>
            <p className="font-medium text-gray-600">Bio</p>
            <p className="text-gray-600">
              {alumni.bio || "No bio available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);


};

export default AlumniProfile;
