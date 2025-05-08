import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Navbar from "../../components/Navbar";
import "../../css/Dashboard.css"; 
const Dashboard = () => {
  const role = JSON.parse(localStorage.getItem("user"))?.role;
  const [stats, setStats] = useState({
    employees: 0,
    admins: 0,
    slips: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/admin/dashboard-stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="dashboard-container">
        <Navbar role={role} />
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Employees</h3>
          <p>{stats.employees}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Admins</h3>
          <p>{stats.admins}</p>
        </div>
        <div className="dashboard-card">
          <h3>Salary Slips Generated</h3>
          <p>{stats.slips}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
