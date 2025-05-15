import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HomePage.css'; 
import logo from '../assets/images/logo.jpg'; 
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container" id="main-content">
      <div className="home-content">
        <div className="home-header">
          <img src={logo} alt="Logo" className="home-logo" />
          <h1 className="home-title">Welcome to Employee Payroll System!</h1>
        </div>
        <p className="home-subtitle">
          A smart solution for managing employees and their payroll.
        </p>
        <button className="login-button" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
}
