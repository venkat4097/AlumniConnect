import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useConnection } from "../contexts/connectionContext";
import { FaEdit, FaSignOutAlt, FaComments, FaLink } from "react-icons/fa";
const AlumniDashboard = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const {
    incomingRequests,
    fetchIncomingRequests,
    acceptRequest,
    rejectRequest
  } = useConnection();

  // Redirect if not logged in or not alumni
  useEffect(() => {
    if (!token || !user || user.role !== "alumni") {
      navigate("/login");
    }
  }, [token, user]);

  // Load connection requests
  useEffect(() => {
    fetchIncomingRequests();
  }, []);

if (!user) return <p className="text-center mt-10">Loading...</p>;

// return (
//   <div className="min-h-screen bg-gray-50 text-gray-800">
//     {/* Top Header */}
//     <header className="bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row justify-between items-center border-b">
//       <div className="flex items-center gap-4">
//         {user.profilePic ? (
//           <img
//             src={user.profilePic}
//             alt="Profile"
//             className="w-14 h-14 rounded-full border border-blue-500 object-cover"
//           />
//         ) : (
//           <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-sm text-gray-600">
//             No Image
//           </div>
//         )}
//         <div>
//           <h1 className="text-2xl font-bold">{user.name}</h1>
//           <p className="text-sm text-gray-600">{user.email}</p>
//         </div>
//       </div>

//       <div className="mt-4 sm:mt-0 flex gap-3">
//         <button
//           onClick={() => navigate("/profile")}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           <FaEdit /> Edit Profile
//         </button>
//         <button
//           onClick={logout}
//           className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//         >
//           <FaSignOutAlt /> Logout
//         </button>
//       </div>
//     </header>

//     {/* Main Content */}
//     <main className="max-w-7xl mx-auto px-6 py-10">
//       {/* Profile Details */}
//       <section className="mb-12">
//         <h2 className="text-xl font-semibold mb-4 border-b pb-2">👤 Profile Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
//           <p><strong>Company:</strong> {user.company || "N/A"}</p>
//           <br></br>
//           <p><strong>Stream:</strong> {user.stream || "N/A"}</p>
//           <p className="sm:col-span-2"><strong>Bio:</strong> {user.bio || "N/A"}</p>
//         </div>
//       </section>

//       {/* Actions */}
//       <section className="mb-12">
//         <h2 className="text-xl font-semibold mb-4 border-b pb-2">🚀 Quick Actions</h2>
//         <div className="flex flex-wrap gap-4">
//           <button
//             onClick={() => navigate("/connections")}
//             className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-blue-700 font-medium py-2 px-4 rounded transition"
//           >
//             <FaLink /> View Connections
//           </button>

//           <button
//             onClick={() => navigate("/chat")}
//             className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-green-700 font-medium py-2 px-4 rounded transition"
//           >
//             <FaComments /> Go to Chat
//           </button>
//         </div>
//       </section>

//       {/* Connection Requests */}
//       {incomingRequests.length > 0 && (
//         <section>
//           <h2 className="text-xl font-semibold mb-4 border-b pb-2">📨 Connection Requests</h2>
//           <div className="space-y-4">
//             {incomingRequests.map((student) => (
//               <div
//                 key={student._id}
//                 className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center"
//               >
//                 <div>
//                   <p className="font-medium">{student.name}</p>
//                   <p className="text-sm text-gray-600">{student.email}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={async () => {
//                       const res = await acceptRequest(student._id);
//                       alert(res.message);
//                       window.location.reload();
//                     }}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={async () => {
//                       const res = await rejectRequest(student._id);
//                       alert(res.message);
//                       window.location.reload();
//                     }}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//     </main>
//   </div>
// );

return (
  <div className="min-h-screen bg-[#121212] text-white">
  {/* Header */}
  <header className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-5 flex flex-col sm:flex-row justify-between items-center shadow-md">
    <div className="flex items-center gap-4 w-full sm:w-auto">
      <div className="relative">
        {user.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-14 h-14 rounded-full border-2 border-green-500 object-cover"
          />
        ) : (
          <div className="w-14 h-14 bg-green-900 rounded-full flex items-center justify-center text-lg font-semibold text-green-400">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#1a1a1a] rounded-full" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white">{user.name}</h1>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
    </div>
    <div className="mt-4 sm:mt-0 flex gap-3">
      <button
        onClick={() => navigate("/profile")}
        className="text-green-400 border border-green-600 hover:bg-green-700 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        <FaEdit className="inline mr-1" /> Edit
      </button>
      <button
        onClick={logout}
        className="text-red-400 border border-red-600 hover:bg-red-700 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        <FaSignOutAlt className="inline mr-1" /> Logout
      </button>
    </div>
  </header>

  {/* Main Section */}
  <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">
    {/* Personal Info */}
    <section className="grid md:grid-cols-3 gap-8">
      <div>
        <h2 className="text-lg font-semibold text-green-400 mb-1">Company</h2>
        <p className="text-gray-300">{user.company || "Not specified"}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-green-400 mb-1">Stream</h2>
        <p className="text-gray-300">{user.stream || "Not specified"}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-green-400 mb-1">Bio</h2>
        <p className="text-gray-300">{user.bio || "Add a bio to let others know more about you."}</p>
      </div>
    </section>

    {/* Quick Actions */}
    <section>
      <h2 className="text-lg font-semibold text-green-400 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/connections")}
          className="flex items-center gap-3 bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 hover:bg-[#2a2a2a] transition"
        >
          <div className="bg-green-900 p-2 rounded-full">
            <FaLink className="text-green-400" />
          </div>
          <div>
            <p className="font-medium text-white">Connections</p>
            <p className="text-sm text-gray-400">View your network</p>
          </div>
        </button>
        <button
          onClick={() => navigate("/chat")}
          className="flex items-center gap-3 bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 hover:bg-[#2a2a2a] transition"
        >
          <div className="bg-green-900 p-2 rounded-full">
            <FaComments className="text-green-400" />
          </div>
          <div>
            <p className="font-medium text-white">Messages</p>
            <p className="text-sm text-gray-400">Start chatting</p>
          </div>
        </button>
      </div>
    </section>

    {/* Incoming Requests */}
    {incomingRequests.length > 0 && (
      <section>
        <h2 className="text-lg font-semibold text-green-400 mb-4">
          Connection Requests ({incomingRequests.length})
        </h2>
        <div className="space-y-4">
          {incomingRequests.map((student) => (
            <div
              key={student._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#1a1a1a] border border-gray-700 rounded-xl gap-4"
            >
              <div className="flex items-center gap-3">
                {student.profilePic ? (
                  <img
                    src={student.profilePic}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium text-gray-300">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-medium text-white">{student.name}</p>
                  <p className="text-sm text-gray-400">{student.email}</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={async () => {
                    const res = await acceptRequest(student._id);
                    toast.success(res.message);
                    window.location.reload();
                  }}
                  className="flex-1 sm:flex-none text-green-400 border border-green-600 hover:bg-green-800 hover:text-white px-3 py-2 rounded-lg text-sm font-medium"
                >
                  Accept
                </button>
                <button
                  onClick={async () => {
                    const res = await rejectRequest(student._id);
                    toast.success(res.message);
                    window.location.reload();
                  }}
                  className="flex-1 sm:flex-none text-red-400 border border-red-600 hover:bg-red-800 hover:text-white px-3 py-2 rounded-lg text-sm font-medium"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    )}
  </main>
</div>



);

};

export default AlumniDashboard;
