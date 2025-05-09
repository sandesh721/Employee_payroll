import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../css/changePasswordModal.css";

const ChangePasswordModal = ({ onClose, onChangePassword }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }
    onChangePassword(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Change Password</h3>

        <div className="form-group">
          <label>Old Password</label>
          <div className="password-field">
            <input
              type={showOld ? "text" : "password"}
              name="oldPassword"
              value={form.oldPassword || ""}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon
              icon={showOld ? faEyeSlash : faEye}
              className="toggle-icon"
              onClick={() => setShowOld(!showOld)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>New Password</label>
          <div className="password-field">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={form.newPassword || ""}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon
              icon={showNew ? faEyeSlash : faEye}
              className="toggle-icon"
              onClick={() => setShowNew(!showNew)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="password-field">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword || ""}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon
              icon={showConfirm ? faEyeSlash : faEye}
              className="toggle-icon"
              onClick={() => setShowConfirm(!showConfirm)}
            />
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={handleSubmit}>Update</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
