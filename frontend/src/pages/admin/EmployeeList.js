import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import "../../css/AllEmployees.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterComponent from "../../components/Filter";
import "../../css/global.css"

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [salarySlips, setSalarySlips] = useState([]);
  const [error, setError] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/admin/employees");
      console.log("Fetched employees response:", res.data); 
      const data = Array.isArray(res.data) ? res.data : res.data.employees || [];
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (err) {
      toast.error("Failed to fetch employees.");
    }
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`/admin/employee/${id}`);
      fetchEmployees();
      toast.success("Employee deleted successfully!");
    } catch {
      toast.error("Failed to delete employee.");
    }
  };
  

  const handleCalculate = async () => {
    try {
      const response = await axios.post("/admin/calculate-salaries");
      setSalarySlips(response.data);
      setError("");
      toast.success("Salary calculation successful!");
      
    } catch (err) {
        toast.error(err.response?.data || "Salary calculation failed.");
    }
  };

  return (
    <div className="all-employees" id="main-content">
      <h2>All Employees</h2>
      {error && <div className="error">{error}</div>}
      <FilterComponent
        data={employees}
        setFilteredData={setFilteredEmployees}
        showDepartment={true}
        showSalarySort={false}
      />

      <button 
        onClick={handleCalculate} 
        className="calculate-btn"
        disabled={employees.length === 0}
        >
        Calculate Salaries
      </button>


      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Designation</th><th>Basic Salary</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(filteredEmployees || []).map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.designation}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => window.location.href=`/admin/viewEmployee/${emp.id}`}>View</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

    </div>
    
  );
};

export default AllEmployees;
