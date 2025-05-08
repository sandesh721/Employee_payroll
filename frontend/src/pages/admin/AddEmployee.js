import React, { useState } from "react";
import axios from "../../api/axiosInstance";
import "../../css/AddEmployee.css";

const departments = ["HR", "Finance", "IT", "Marketing", "Operations"];
const designations = ["Manager", "Team Lead", "Developer", "Analyst", "Intern"];

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    password: "",
    gender: "",
    joining_date: new Date().toISOString().split("T")[0], 
  });
  

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "salary") {
      setFormData({ ...formData, salary: parseFloat(e.target.value) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let generated = "";
    for (let i = 0; i < 6; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password: generated }));
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const salaryRegex = /^\d+(\.\d{1,2})?$/;

    if (!formData.name.trim()) return "Name is required";
    if (!emailRegex.test(formData.email)) return "Invalid email format";
    if (!phoneRegex.test(formData.phone)) return "Phone must be 10 digits";
    if (!formData.department) return "Department is required";
    if (!formData.designation) return "Designation is required";
    if (!salaryRegex.test(formData.salary)) return "Salary must be a valid number";
    if (!formData.password) return "Password must be generated";
    if (!formData.gender) return "Gender is required";

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
      const response = await axios.post("/admin/add-employee", formData);
      setMessage(response.data);
      setError("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        password: "",
        gender:"",
        joining_date:"",
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.response?.data || "Error occurred";
      setError(errorMsg);
      setMessage("");
    }
    
  };

  return (
    <div className="add-employee-container">
      <h2>Add New Employee</h2>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="employee-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select name="department" value={formData.department} onChange={handleChange} required>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <select name="designation" value={formData.designation} onChange={handleChange} required>
          <option value="">Select Designation</option>
          {designations.map((des) => (
            <option key={des} value={des}>{des}</option>
          ))}
        </select>

        <input
          type="number"
          name="salary"
          placeholder="Salary(Monthly)"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <div className="password-section">
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            readOnly
            required
          />
          <button type="button" onClick={generatePassword} className="generate-btn">Generate</button>
        </div>

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
