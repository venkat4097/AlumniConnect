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
  <div className="min-h-screen bg-gray-50 text-gray-800">
    {/* Header */}
    <header className="bg-white shadow-sm py-4 px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center border-b">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-blue-500 object-cover"
            />
          ) : (
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-lg font-semibold text-blue-600">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="mt-4 sm:mt-0 flex gap-3">
        <button
          onClick={() => navigate("/profile")}
          className="text-blue-600 border border-blue-500 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <FaEdit className="inline mr-1" /> Edit
        </button>
        <button
          onClick={logout}
          className="text-red-600 border border-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <FaSignOutAlt className="inline mr-1" /> Logout
        </button>
      </div>
    </header>

    {/* Main */}
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Profile Info */}
      <section className="bg-white rounded-xl shadow-sm border mb-8">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-lg font-semibold text-blue-800">Profile Information</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Company</p>
            <p className="mt-1 text-gray-800">{user.company || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Stream</p>
            <p className="mt-1 text-gray-800">{user.stream || "Not specified"}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-500">Bio</p>
            <p className="mt-1 text-gray-800">
              {user.bio || "Add a bio to let others know more about you."}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-blue-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/connections")}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:shadow transition"
          >
            <div className="bg-blue-100 p-2 rounded-full">
              <FaLink className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Connections</p>
              <p className="text-sm text-gray-500">View your network</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:shadow transition"
          >
            <div className="bg-blue-100 p-2 rounded-full">
              <FaComments className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Messages</p>
              <p className="text-sm text-gray-500">Start chatting</p>
            </div>
          </button>
        </div>
      </section>

      {/* Incoming Requests */}
      {incomingRequests.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-blue-800 mb-4">
            Connection Requests ({incomingRequests.length})
          </h2>
          <div className="space-y-4">
            {incomingRequests.map((student) => (
              <div
                key={student._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg gap-4"
              >
                <div className="flex items-center gap-3">
                  {student.profilePic ? (
                    <img
                      src={student.profilePic}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={async () => {
                      const res = await acceptRequest(student._id);
                      toast.success(res.message);
                      window.location.reload();
                    }}
                    className="flex-1 sm:flex-none text-blue-600 border border-blue-500 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    Accept
                  </button>
                  <button
                    onClick={async () => {
                      const res = await rejectRequest(student._id);
                      toast.success(res.message);
                      window.location.reload();
                    }}
                    className="flex-1 sm:flex-none text-red-600 border border-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium"
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
