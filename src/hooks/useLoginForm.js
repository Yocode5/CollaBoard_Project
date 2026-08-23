
import { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/validation';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (emailErr || passwordErr) {
      setErrors({ email: emailErr, password: passwordErr });
    } else {
      setErrors({});
      console.log("Login UI submitted successfully!");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    handleTogglePassword,
    errors,
    handleSubmit,
  };
};
