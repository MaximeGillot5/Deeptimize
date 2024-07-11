import React, { useState } from 'react';
import deeptimizeLogo from '../assets/images/deeptimize-logo.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password'); // Nouvel état pour le type de champ de mot de passe
  const [error, setError] = useState('');

  const handleForgotPassword = () => {
    navigate('/forgot');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const loginData = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch('/api/nonprod/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.access_token;

      // Sauvegarder le token dans localStorage
      localStorage.setItem('authToken', token);

      // Naviguer vers la page dashboard après un login réussi
      navigate('/upload');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <div className='login-container'>
      <img alt="Deeptimize Logo" className='logo-deeptimize' src={deeptimizeLogo} />
      <h1 className='title-login'>Premium Sport Data with AI.</h1>
      <form className='login-form' onSubmit={handleLogin}>
        <div className='form-group'>
          <label htmlFor='email'>Mail:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <div className='password-input-container'>
            <input
              type={passwordType}
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type='button' onClick={togglePasswordVisibility} className='toggle-password-button'>
              {passwordType === 'password' ? 'Show' : 'Hide'}
            </button>
          </div>
        </div>
        {error && <p className='error-message'>{error}</p>}
        <a onClick={handleForgotPassword} className='forgot-password'>Forgot Password?</a>
        <button type='submit' className='login-button'>Login</button>
      </form>
    </div>
  );
}

export default Login;
