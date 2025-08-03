import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { registerUser, loading, error, resetError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetError();

    const success = await registerUser({ userName, email, password });

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

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

        <button type="submit" >
          { "Sign Up"}
        </button>
      </form>

      <div className="auth-links">
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
