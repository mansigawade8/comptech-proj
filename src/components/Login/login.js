import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const clientId = '1064148529426-8q6ddrupm21bff457kumbboddd1gv59u.apps.googleusercontent.com'; // Replace with your actual Google Client ID

  const validateField = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    switch (name) {
      case 'email':
        if (!emailRegex.test(value)) return 'Invalid email address';
        break;
      case 'password':
        if (!passwordRegex.test(value)) return 'Incorrect password';
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here
      console.log(formData);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const onGoogleSuccess = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log('Login Success: currentUser:', userObject);
    // Handle the response and authenticate the user on your backend
  };

  const onGoogleFailure = (error) => {
    console.log('Login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-container">
        <style>
          {`
            .login-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
                background-color: #f9f9f9;
                color: #333;
                width: 100%;
                box-sizing: border-box;
                border-radius: 0 0 10px 10px;
                max-width: 600px;
                margin: auto;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .login-title {
                font-size: 1.5em;
                font-weight: bold;
                margin-bottom: 20px;
                color: #680870;
            }

            .login-form {
                width: 100%;
            }

            .login-form div {
                margin-bottom: 15px;
            }

            .login-form label {
                display: block;
                font-size: 1em;
                margin-bottom: 5px;
                color: #680870;
            }

            .login-form input {
                width: calc(100% - 20px);
                padding: 10px;
                font-size: 1em;
                border: 1px solid #ddd;
                border-radius: 5px;
                box-sizing: border-box;
            }

            .login-form button {
                background-color: #680870;
                color: white;
                padding: 10px 20px;
                font-size: 1em;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            .login-form button:hover {
                background-color: #54065c;
            }

            .register-link {
                margin-top: 10px;
                color: #680870;
                cursor: pointer;
            }

            .register-link:hover {
                text-decoration: underline;
            }

            .google-login {
                margin-top: 20px;
            }

            .error {
                color: red;
                font-size: 0.875em;
                margin-top: 5px;
            }

            @media (max-width: 768px) {
                .login-container {
                    padding: 10px;
                }

                .login-form input {
                    width: calc(100% - 10px);
                }
            }
          `}
        </style>
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Email Address:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="register-link" onClick={handleRegisterClick}>
          Not registered? Register here
        </div>
        <div className="google-login">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={onGoogleFailure}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
