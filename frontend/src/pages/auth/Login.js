import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import "../../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "EMPLOYEE",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

      setMessage("Login successful");
      setError("");

      if (formData.role === "ADMIN") {
        console.log("Admin logged in");
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/profile");
      }
    } catch (err) {
      setError("Invalid credentials or server error");
      setMessage("");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="ADMIN">Admin</option>
        </select><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
