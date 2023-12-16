/* AuthComponent.js */

import React, { useState } from 'react';
import './AuthComponent.css';

const AuthComponent = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State to manage error and welcome messages
  const [errorMessage, setErrorMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  // State to manage sign-up/login toggle
  const [isSignUp, setIsSignUp] = useState(true);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle between sign-up and login forms
  const handleFormToggle = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrorMessage('');
    setWelcomeMessage('');
    setIsSignUp(!isSignUp);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if user already exists for sign-up
      const existingUser = await fetchUserByEmail(formData.email);

      if (isSignUp) {
        if (existingUser) {
          throw new Error('Email already exists');
        }

        // Continue with sign-up logic
        const response = await fetch('https://654d199b77200d6ba859fcf7.mockapi.io/SignIn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Umable to sign up');
        }
      } else {
        // Continue with login logic
      }

      // Common logic for both sign-up and login
      setWelcomeMessage(isSignUp ? `Welcome, ${formData.name || formData.email}! Account created.` : 'Welcome back!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(`Failed to ${isSignUp ? 'sign up' : 'log in'}. ${error.message}`);
    }
  };

  // Fetch user data by email
  const fetchUserByEmail = async (email) => {
    try {
      const response = await fetch(
        `https://654d199b77200d6ba859fcf7.mockapi.io/SignIn?search=${encodeURIComponent(email)}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      // Return a value (commented)
      return userData.length ? userData[0] : null;
    } catch (error) {
      // Throw an error (commented)
      throw new Error('Failed to fetch user data');
    }
  };

  return (
    <div className={`auth-container ${isSignUp ? 'signup' : 'login'}`}>
      <form onSubmit={handleSubmit} className="auth-form">
        {/* Form title */}
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

        {/* Name input field for sign-up */}
        {isSignUp && (
          <div className="form-field">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              autoComplete="username"
              placeholder="Name"
              
            />
          </div>
        )}

        {/* Email input field */}
        <div className="form-field">
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Email"
          />
        </div>

        {/* Password input field */}
        <div className="form-field">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            placeholder="Password"
          />
        </div>

        {/* Confirm Password input field for sign-up */}
        {isSignUp && (
          <div className="form-field">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
              placeholder="Confirm Password"
            />
          </div>
        )}

        {/* Submit button */}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>

      {/* Toggle between sign-up and login */}
      {isSignUp && (
        <p className="forgot-password">
          Already have an account?{' '}
          <button type="button" onClick={handleFormToggle}>
            Login
          </button>
        </p>
      )}

      {/* Display error message */}
      <p className="error-message">{errorMessage}</p>

      {/* Display welcome message */}
      {welcomeMessage && <p className="welcome-message">{welcomeMessage}</p>}
    </div>
  );
};

export default AuthComponent;
