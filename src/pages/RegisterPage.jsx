import { useState } from 'react';
import '../components/Register/RegisterPage.css'; 

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-branding">
        <h1 className="auth-logo">CollaBoard</h1>
        <p className="auth-tagline">Task Management System</p>
      </div>

      <div className="auth-form-container">
        <div className="auth-card">
          <h2 className="auth-title">Register</h2>
          
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                />
                <i 
                  className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;