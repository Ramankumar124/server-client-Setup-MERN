import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { loginUser, loading, error, resetError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetError();

    const success = await loginUser({ email, password });

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {"Sign In"}
        </button>
      </form>

      <div className="auth-links">
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
