import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../assets/images/logo.jpg";

const Navbar = ({ role: propRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(propRole || null);

  // Load role from localStorage on mount
  useEffect(() => {
    if (!propRole) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.role) {
        setRole(storedUser.role);
      }
    }
  },);

  const getLinkClass = (path) =>
    location.pathname === path ? "nav-link active-tab" : "nav-link";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setRole(null);
    navigate("/");
  };

  return (
    <>
      {/* Top Navbar for public users */}
      {!role && (
        <div className="top-navbar">
          <img
            src={logo}
            alt="EPS Logo"
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <Link to="/" className={getLinkClass("/")}>Home</Link>
          <Link to="/login" className={getLinkClass("/login")}>Login</Link>
        </div>
      )}

      {/* Sidebar for authenticated users */}
      {role && (
        <>
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            &#9776;
          </div>

          <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <img
              src={logo}
              alt="EPS Logo"
              className="logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />

            <div className="sidebar-links">
              {role === "ADMIN" && (
                <>
                  <Link to="/admin/dashboard" className={getLinkClass("/admin/dashboard")}>Dashboard</Link>
                  <Link to="/admin/add-employee" className={getLinkClass("/admin/add-employee")}>Add Employee</Link>
                  <Link to="/admin/add-admin" className={getLinkClass("/admin/add-admin")}>Add Admin</Link>
                  <Link to="/admin/employees" className={getLinkClass("/admin/employees")}>All Employees</Link>
                  <Link to="/admin/slips" className={getLinkClass("/admin/slips")}>View All Slips</Link>
                  <Link to="/admin/profile" className={getLinkClass("/admin/profile")}>Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              )}

              {role === "EMPLOYEE" && (
                <>
                  <Link to="/employee/profile" className={getLinkClass("/employee/profile")}>Profile</Link>
                  <Link to="/employee/slip" className={getLinkClass("/employee/slip")}>Salary Slip</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
