import { useState } from 'react';
import { registerUser } from '../api/authApi';
import '../components/Register/RegisterPage.css';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (!name || !email || !password) {
            setError('Name, email, and password are required.');
            return;
        }

        try {
            setLoading(true);

            const result = await registerUser(
                name,
                email,
                password
            );

            // Save authentication data returned by the backend
            localStorage.setItem('token', result.data.token);

            localStorage.setItem(
                'user',
                JSON.stringify(result.data.user)
            );

            // Redirect to dashboard
            window.location.href = '/dashboard';

        } catch (error) {
            console.error('Registration failed:', error);

            setError(error.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-branding">
                <h1 className="auth-logo">CollaBoard</h1>
                <p className="auth-tagline">
                    Task Management System
                </p>
            </div>

            <div className="auth-form-container">

                <div className="auth-card">

                    <h2 className="auth-title">
                        Register
                    </h2>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">
                            <label>Name</label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>

                            <div className="password-input-wrapper">

                                <input
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                <i
                                    className={`fa-solid ${
                                        showPassword
                                            ? 'fa-eye-slash'
                                            : 'fa-eye'
                                    } toggle-password`}
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                ></i>

                            </div>
                        </div>

                        {error && (
                            <span className="error-text">
                                {error}
                            </span>
                        )}

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={loading}
                        >
                            {loading
                                ? 'Registering...'
                                : 'Register'}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default RegisterPage;