import React, { useState, useEffect } from "react";
import axios from "../../api/axiosInstance";
import "../../css/AddAdmin.css";
import Navbar from "../../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const AddAdmin = () => {
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let pwd = "";
    for (let i = 0; i < 6; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, password: pwd });
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) return "Name is required";
    if (!emailRegex.test(formData.email)) return "Invalid email format";
    if (!formData.gender) return "Gender is required";
    if (!phoneRegex.test(formData.phone)) return "Phone must be 10 digits";
    if (!formData.password) return "Password must be generated or entered";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setMessage("");
      return;
    }

    try {
      const response = await axios.post("/admin/add-admin", formData);
      toast.success(response.data);
      setError("");
      setFormData({ name: "", email: "", password: "", gender: "", phone: "" });
      fetchAdmins();
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data || "Error occurred");
      setMessage("");
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("/admin/all-admins");
      setAdmins(response.data);
    } catch (error) {
      toast.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="add-admin-container">
      <Navbar role={role} />
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>➕ Add Admin</button>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>✖</button>
            <h2>Add New Admin</h2>
            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <div className="password-section">
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="generate-btn" onClick={generatePassword}>Generate</button>
              </div>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
              <button type="submit">Add Admin</button>
            </form>
          </div>
        </div>
      )}

      <div className="admin-list">
        <h3>All Admins</h3>
        {admins.length > 0 ? (
          admins.map((admin) => (
            <div key={admin.id} className="admin-card">
              <strong>{admin.name}</strong><br />
              Email: {admin.email}<br />
              Gender: {admin.gender}<br />
              Phone: {admin.phone}
            </div>
          ))
        ) : (
          <p>No admins found.</p>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

    </div>
  );
};

export default AddAdmin;
