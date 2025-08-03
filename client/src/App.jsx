import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./features/auth/authSlice";

// Components
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  // Check authentication status when app loads
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Redirect to dashboard if authenticated, otherwise to login */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
