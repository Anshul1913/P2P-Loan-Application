import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../service/authService"; // adjust import as per your file
import studentImage from "../assets/Copilot_20250730_172942.png";
import AuthApi from "../services/AuthService";
import Cookies from "js-cookie"; // Ensure you have js-cookie installed for cookie management
const LoginPage = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(formData);
   
    try {
      setLoading(true);
       const loginDTO = {
      email: formData.email,
      password: formData.password
    };

    
        const response = await AuthApi.login(loginDTO);

        console.log("Login successful:", response);
        const { jwtToken } = response;
        Cookies.set('jwtToken', jwtToken);
        const storedJwtToken = Cookies.get('jwtToken');

         console.log("JWT Token:", jwtToken);
         console.log("Stored JWT Token:", storedJwtToken);

            navigate('/kyc-verification'); // Redirect to KYC verification page
    
      // Redirect or set token here
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ general: error || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf6] px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Student-Centric P2P <br />
            Loan Management
          </h1>
          <p className="text-gray-600 text-lg">
            Connecting students with lenders for educational loans
          </p>
          
          {/* Image */}
          <div className="pt-6">
            <img
              src={studentImage}
              alt="Student" 
                className="w-full max-w-xs md:max-w-sm"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white w-full  rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>

          {errors.general && (
            <p className="text-red-500 text-sm">{errors.general}</p>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="text-right text-sm text-gray-500">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6366f1] text-white py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#6366f1] font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
