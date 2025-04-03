import React, { useState } from 'react';
import authService from '../services/authService';
import './LoginPage.css';

const LoginPage = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await authService.login(credentials)
    const token = response.data.access
    if (token) {
      window.location.reload();
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" >Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
