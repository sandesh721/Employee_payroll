import React, { useState, useEffect } from "react";
import axios from "../../api/axiosInstance";
import FilterComponent from "../../components/Filter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/AllSalarySlips.css"; 
const AllSalarySlips = () => {
  const [salarySlips, setSalarySlips] = useState([]);
  const [filteredSlips, setFilteredSlips] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSalarySlips();
  }, []);

  const fetchSalarySlips = async () => {
    try {
      const response = await axios.get("/admin/salary-slips");
      console.log("Fetched salary slips response:", response.data);
      setSalarySlips(response.data);
      setFilteredSlips(response.data); 
    } catch (error) {
      setError("Failed to fetch salary slips.");
      toast.error("Failed to fetch salary slips.");
    }
  };

  return (
    <div className="salary-slips-container">
      <h2>All Salary Slips</h2>
      {error && <div className="error">{error}</div>}
      
      <FilterComponent
        data={salarySlips}
        setFilteredData={setFilteredSlips}
        showDepartment={true}
        showSalarySort={true}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Generated Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredSlips.length > 0 ? (
            filteredSlips.map((slip) => (
              <tr key={slip.id}>
                <td>{slip.id}</td>
                <td>{slip.name}</td>
                <td>{slip.designation}</td>
                <td>{slip.netSalary}</td>
                <td>{new Date(slip.generatedAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No salary slips found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AllSalarySlips;
