// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex items-center justify-between">
//       <div className="flex items-center gap-4">
//         <Link to="/" className="text-xl font-bold text-white hover:text-blue-400">
//           AlumniPortal
//         </Link>

//         {/* Profile Link */}
//         {user && (
//           <Link to="/profile" className="hover:text-blue-400 font-medium">
//             Profile
//           </Link>
//         )}

//         {/* Role-Based Dashboard */}
//         {user?.role === "student" && (
//           <Link to="/student-dashboard" className="hover:text-blue-400 font-medium">
//             Dashboard
//           </Link>
//         )}
//         {user?.role === "alumni" && (
//           <Link to="/alumni-dashboard" className="hover:text-blue-400 font-medium">
//             Dashboard
//           </Link>
//         )}
//       </div>

//       {/* Auth Buttons */}
//       <div className="flex items-center gap-4">
//         {!user ? (
//           <>
//             <Link to="/login" className="hover:text-blue-400 font-medium">
//               Login
//             </Link>
//             <Link to="/register" className="hover:text-blue-400 font-medium">
//               Register
//             </Link>
//           </>
//         ) : (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md font-medium"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
