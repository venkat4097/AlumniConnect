import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-[#121212] px-4">
  <form
    onSubmit={handleSubmit}
    className="bg-[#1e1e1e] shadow-2xl text-white p-8 rounded-xl w-full max-w-md space-y-6"
  >
    <h2 className="text-3xl font-bold text-center text-white">Alumni Connect</h2>

    {error && (
      <p className="text-sm text-center text-red-500 font-medium bg-red-500 bg-opacity-10 p-2 rounded">
        {error}
      </p>
    )}

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Email address"
      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#333] rounded-md focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
      required
    />

    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Password"
      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#333] rounded-md focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
      required
    />

    <button
      type="submit"
      className="w-full bg-[#1DB954] hover:bg-[#1aa34a] text-black font-semibold py-3 rounded-md transition"
    >
      Login
    </button>

    <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
      <p>Not registered yet?</p>
      <button
        type="button"
        className="text-[#1DB954] hover:underline"
        onClick={() => navigate("/Register")}
      >
        Register
      </button>
    </div>
  </form>
</div>

  );
};

export default Login;
