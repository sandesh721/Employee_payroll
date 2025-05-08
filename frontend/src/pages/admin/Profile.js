import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Navbar from "../../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/profile.css";
const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const role = JSON.parse(localStorage.getItem("user"))?.role;
  useEffect(() => {
    const fetchProfile = async () => {
      const email = JSON.parse(localStorage.getItem("user"))?.email;
        if (!email) {
            toast.error("User not logged in.");
            return;
        }
      try {
        const res = await axios.post("/admin/profile", {email});
        setFormData(res.data);
      } catch (err) {
        toast.error("Failed to load profile.");
      }
    };
  
    fetchProfile();
  }, []);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put("/admin/update-profile", formData); // adjust API
      toast.success("Profile updated successfully!");
      setError("");
    } catch (err) {
      toast.error(err.response?.data || "Failed to update profile.");
    }
  };

  if (error) return <div className="form-error">{error}</div>;

  return (
    <div className="profile-page">
      <Navbar role={role} />
      <h2 className="form-title">My Profile</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} disabled />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </div>
      </div>

      <button className="form-button" onClick={handleUpdate}>
        Update Profile
      </button>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

    </div>
  );
};

export default ProfilePage;
