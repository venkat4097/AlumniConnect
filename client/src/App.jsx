import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AlumniDashboard from "./pages/AlumniDashboard.jsx";
import AlumniProfile from "./pages/AlumniProfile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Connections from "./pages/Connections.jsx";
import ChatPage from "./pages/ChatPage.jsx";
function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/student-dashboard"
        element={
          <PrivateRoute>
            <StudentDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/alumni-dashboard"
        element={
          <PrivateRoute>
            <AlumniDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/alumni/:id"
        element={
          <PrivateRoute>
            <AlumniProfile />
          </PrivateRoute>
        }
      />
      <Route
  path="/connections"
  element={
    <PrivateRoute>
      <Connections />
    </PrivateRoute>
  }
/>
<Route path="/chat" element={<ChatPage />} />
      {/* Default fallback route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
