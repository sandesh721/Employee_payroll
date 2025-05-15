import React, { useState } from "react";
import "../css/changePasswordModal.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axiosInstance"; 

const ForgotPasswordModal = ({ onClose }) => {
  const [form, setForm] = useState({
    role: "EMPLOYEE", 
    email: "",
    otp: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!form.email) {
      alert("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/auth/forgot-password", {
        email: form.email,
        role: form.role.toUpperCase(),
      });

      alert(res.data);
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data || "Failed to send OTP. Try again.");
    }
    finally {
      setLoading(false); 
    }
  };

  const handleSubmit = async () => {
    if (!form.otp || !form.newPassword) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post("/auth/reset-password", {
        email: form.email,
        role: form.role.toUpperCase(),
        otp: form.otp,
        newPassword: form.newPassword,
      });
      alert(res.data);
      onClose();
    } catch (err) {
      alert(err.response?.data || "Failed to reset password. Try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Forgot Password</h3>

        <div className="form-group">
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
           <button
                onClick={handleSendOtp}
                className="send-otp"
                disabled={loading} 
            >
                {loading ? "Sending..." : "Send OTP"} 
            </button>
        </div>

        {otpSent && (
          <>
            <div className="form-group">
              
              <input
                type="text"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                required
              />
            </div>

            <div className="form-group">
              
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                />
                <span
                  className="toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            <div className="modal-buttons">
              <button onClick={handleSubmit}>Reset Password</button>
              <button onClick={onClose} className="cancel">Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
