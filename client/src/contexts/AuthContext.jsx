import { createContext, useContext, useState } from "react";
import axios from "../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../config/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);


  const login=async(formdata)=>{
    try {
      const res = await axiosInstance.post("/auth/login", formdata);
      const { user, token } = res.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
      if (user.role === "student") {
        navigate("/student-dashboard");
      } else if (user.role === "alumni") {
        navigate("/alumni-dashboard");
      } else {
        navigate("/profile");
      }

    } catch (err) {
      console.log(err.message);
    }


  }

 const registration =async(formData)=>{
  setLoading(true);
    try {
      await axios.post("/auth/register", formData);
      setLoading(false);
      navigate("/login");
      alert("✅ Registered successfully!");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed");
    }
 }


  // 🔓 Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  // 👤 Get Profile
 // 👤 Safe Get Profile
const getProfile = async () => {
  try {
    setLoading(true);

    const res = await axiosInstance.get("/user/profile", {});

    // 🛑 Only update user if it's different
    if (!user || user._id !== res.data._id) {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    }

    console.log("✅ GET /user/profile returned", res.data);
    return res.data;
  } catch (err) {
    console.error("⚠️ Error fetching profile:", err.message);
    logout();
    navigate("/login");
  } finally {
    setLoading(false); // ✅ Always stop loading
  }
};

// ✏️ Update profile
const updateProfile = async (updatedData) => {
  try {
    const res = await axiosInstance.put("/user/profile", updatedData);

    // Update context and localStorage
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Update failed",
    };
  }
};


const imageuploader=async(file)=>{
   const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await axiosInstance.patch("/user/profile-pic", formData);
      window.location.reload(); // Reload to reflect new image
    } catch (err) {
      setMessage("❌ Image upload failed.");
    }
}


const fetchAlumni=async(id)=>{
   try {
        const res = await axiosInstance.get(`/user/alumni/${id}`);
        return res.data;
      } catch (err) {
        console.log(err.message);
      }

}

const fetchAllAlumni=async()=>{
  try {
        const res = await axiosInstance.get("/user/alumni");
        return res.data;
        // This updates the global context
      } catch (err) {
        console.error(err);
        setError("Failed to load alumni. Please try again.");
      } finally {
        setLoading(false);
      }
}

  const isAuthenticated = !!token && !!user;

  return (
      <AuthContext.Provider
  value={{
    user,
    token,
    login,
    registration,
    logout,
    getProfile,
    updateProfile, // ✅ must be included here
    isAuthenticated,
    loading,
    imageuploader,
    fetchAlumni,
    fetchAllAlumni,
  }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔁 Hook
export const useAuth = () => useContext(AuthContext);
