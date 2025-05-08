import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import EmployeeList from './pages/admin/EmployeeList';
import AddEmployee from './pages/admin/AddEmployee';
import AddAdmin from './pages/admin/AddAdmin';
import Slips from './pages/admin/Slips';
import Profile from './pages/employee/Profile';
import SalarySlip from './pages/employee/SalarySlip';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar role={JSON.parse(localStorage.getItem('user'))?.role} /> {/* Display Navbar */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AddAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/slips"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Slips />
            </ProtectedRoute>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/slip"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <SalarySlip />
            </ProtectedRoute>
          }
        />
        
        {/* Optional: Fallback route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
