import { useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const {registration}=useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    registration(formData);
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-[#121212] px-4">
  <form
    onSubmit={handleSubmit}
    className="bg-[#1e1e1e] shadow-xl text-white p-8 rounded-xl w-full max-w-md space-y-5"
  >
    <h2 className="text-3xl font-bold text-center">Join Alumni Connect</h2>

    {error && (
      <p className="text-sm text-center text-red-500 bg-red-500 bg-opacity-10 p-2 rounded">
        {error}
      </p>
    )}

    <input
      type="text"
      name="name"
      placeholder="Full name"
      value={formData.name}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#333] rounded-md focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
      required
      autoFocus
    />

    <input
      type="email"
      name="email"
      placeholder="Email address"
      value={formData.email}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#333] rounded-md focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
      required
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#333] rounded-md focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
      required
    />

    <p className="text-sm text-gray-400">Use a strong password (min 6 characters)</p>

    <select
      name="role"
      value={formData.role}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-[#2a2a2a] text-white border border-[#333] rounded-md focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
    >
      <option value="student">Student</option>
      <option value="alumni">Alumni</option>
    </select>

    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3 rounded-md text-black font-semibold ${
        loading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-[#1DB954] hover:bg-[#1aa34a] transition"
      }`}
    >
      {loading ? "Registering..." : "Register"}
    </button>

    <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
      <p>Already registered?</p>
      <button
        type="button"
        className="text-[#1DB954] hover:underline"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  </form>
</div>

  );
};

export default Register;
