// AuthComponent.js
import React, { useState } from 'react';
import './AuthComponent.css';

const AuthComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormToggle = () => {
    setFormData({ name: '', email: '', password: '' });
    setErrorMessage('');
    setWelcomeMessage('');
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        isSignUp
          ? 'https://654d199b77200d6ba859fcf7.mockapi.io/SignIn'
          : 'https://654d199b77200d6ba859fcf7.mockapi.io/Login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(isSignUp ? 'Failed to sign up' : 'Failed to log in');
      }

      const userDataResponse = await fetch('https://api.example.com/userdata', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${response.token}`, // Include the token if needed
        },
      });

      if (!userDataResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userDataResponse.json();

      setErrorMessage('');
      setWelcomeMessage(`Welcome, ${userData.name || formData.name || formData.email}!`);
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(`Failed to ${isSignUp ? 'sign up' : 'log in'}. Please try again.`);
    }
  };

  return (
    <div className={`auth-container ${isSignUp ? 'signup' : 'login'}`}>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {isSignUp && (
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              autoComplete="username"
            />
          </div>
        )}

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
          />
        </div>

        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>

      <p className="error-message">{errorMessage}</p>
      {welcomeMessage && <p className="welcome-message">{welcomeMessage}</p>}

      <p>
        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
        <button type="button" onClick={handleFormToggle}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default AuthComponent;
