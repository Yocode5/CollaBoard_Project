import React from 'react';
import { useLoginForm } from '../hooks/useLoginForm';
import './LoginPage.css';

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    handleTogglePassword,
    errors,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="login-page-container">
      <div className="login-hero-section">
        <h1 className="brand-title">CollaBoard</h1>
        <p className="brand-subtitle">Task Management System</p>
      </div>


      <div className="login-form-section">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </span>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <p className="register-redirect">
              Don't Have an Account? <a href="/register">Register</a>
            </p>

            <button type="submit" className="login-submit-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}