import { useAuth } from "../contexts/AuthContext";
import { useConnection } from "../contexts/connectionContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { token, user, logout, fetchAllAlumni } = useAuth();
  const {
    sendConnectionRequest,
    getConnections,
    connections,
    sentRequests,
  } = useConnection();

  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user.role !== "student") {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchAllAlumni(); // ✅ fixed
        setAlumni(data);
        await getConnections();
      } catch (err) {
        console.error(err);
        setError("Failed to load alumni. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, user]);

  const handleConnect = async (alumniId) => {
    try {
      const res = await sendConnectionRequest(alumniId);
      alert(res.message);
      await getConnections();
      const updated = await fetchAllAlumni(); // ✅ fixed await
      setAlumni(updated); // ✅ fixed
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send request");
    }
  };

  const filteredAlumni = alumni.filter((alum) =>
    alum.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.stream?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10">Loading alumni...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

return (
<div className="min-h-screen bg-[#121212] text-white p-6">
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
    <h1 className="text-3xl font-bold">Student Dashboard</h1>

    <div className="flex gap-3 items-center w-full md:w-auto">
      <input
        type="text"
        placeholder="Search alumni..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-72 px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-[#3e3e3e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      />
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  </div>

  {filteredAlumni.length === 0 ? (
    <p className="text-center text-gray-400">No matching alumni found.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAlumni.map((alum) => {
        const isConnected = connections.some(conn => conn._id === alum._id);
        const isPending = sentRequests.some(req => req._id === alum._id);

        return (
          <div
            key={alum._id}
            className="bg-[#1f1f1f] rounded-xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-xl hover:bg-[#2a2a2a] transition"
          >
            {alum.profilePic ? (
              <img
                src={alum.profilePic}
                alt={`${alum.name}'s profile`}
                className="w-20 h-20 object-cover rounded-full mb-4 border border-gray-500"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mb-4 text-sm text-gray-300">
                No Image
              </div>
            )}

            <h2 className="text-lg font-semibold">{alum.name}</h2>
            <p className="text-sm text-gray-400">{alum.email}</p>
            <p className="text-sm text-gray-400">{alum.company || "N/A"}</p>
            <p className="text-sm text-gray-400">{alum.stream || "N/A"}</p>

            <Link
              to={`/alumni/${alum._id}`}
              className="mt-2 text-green-400 hover:underline text-sm"
            >
              View Profile
            </Link>

            {isConnected ? (
              <>
                <button
                  disabled
                  className="mt-3 px-4 py-1 bg-gray-600 text-white rounded-full cursor-default"
                >
                  Connected
                </button>
                <button
                  onClick={() => navigate("/chat")}
                  className="mt-2 px-4 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                  Message
                </button>
              </>
            ) : isPending ? (
              <button
                disabled
                className="mt-3 px-4 py-1 bg-yellow-500 text-white rounded-full cursor-wait"
              >
                Pending Request
              </button>
            ) : (
              <button
                onClick={() => handleConnect(alum._id)}
                className="mt-3 px-4 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition cursor-pointer"
              >
                Connect
              </button>
            )}
          </div>
        );
      })}
    </div>
  )}
</div>

);

};

export default StudentDashboard;
