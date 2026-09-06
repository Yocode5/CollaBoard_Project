import { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/validation';
import { loginUser } from '../api/authApi';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (emailErr || passwordErr) {
      setErrors({
        email: emailErr,
        password: passwordErr,
      });
      return;
    }

    setErrors({});

    try {
      console.log('1. Sending login request...');

      const result = await loginUser(email, password);

      console.log('2. Login successful:', result);

      const token = result?.data?.token;
      const user = result?.data?.user;

      if (!token || !user) {
        throw new Error('Login response did not contain authentication data.');
      }

      console.log('3. Token received');

      localStorage.setItem('token', token);
      console.log('4. Token saved');

      localStorage.setItem('user', JSON.stringify(user));
      console.log('5. User saved');

      console.log('6. Current URL:', window.location.href);
      console.log('7. Redirecting to dashboard...');

      window.location.href = '/dashboard';

    } catch (error) {
      console.error('LOGIN ERROR:', error);

      setErrors({
        form: error.message || 'Login failed.',
      });
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