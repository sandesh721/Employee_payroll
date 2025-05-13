import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import "../../css/Login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "EMPLOYEE",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/profile");
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        formData.role === "ADMIN" ? "/admin/login" : "/employee/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ email: formData.email, role: formData.role })
      );

      toast.success("Login successful");

      if (formData.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/profile");
      }
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  // Forgot Password Handler
  const handleResetPassword = async (data) => {
    try {
      const response = await axios.post("/api/reset-password-otp", data);
      toast.success(response.data);
      setShowForgotModal(false);
    } catch (error) {
      toast.error("Failed to reset password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide Password" : "Show Password"}
          />
        </div>
        <br />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="ADMIN">Admin</option>
        </select>
        <br />

        <button type="submit">Login</button>
      </form>

      <p className="forgotPassword" onClick={() => setShowForgotModal(true)}>
        Forgot Password?
      </p>

      <ToastContainer position="top-right" autoClose={3000} />

      {showForgotModal && (
        <ForgotPasswordModal
          onClose={() => setShowForgotModal(false)}
          onResetPassword={handleResetPassword}
        />
      )}
    </div>
  );
};
export default Login;