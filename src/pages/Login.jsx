import React from 'react';
import deeptimizeLogo from '../assets/images/deeptimize-logo.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const handleForgotPassword = () => {
      navigate('/forgot');
    };

  return (
    <div className='login-container'>
      <img alt="Deeptimize Logo" className='logo-deeptimize' src={deeptimizeLogo} />
      <h1 className='title-login'>Premium Sport Data with AI.</h1>
      <form className='login-form'>
        <div className='form-group'>
          <label htmlFor='email'>Mail:</label>
          <input type='email' id='email' name='email' required />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' required />
        </div>
        <a onClick={handleForgotPassword} className='forgot-password'>Forgot Password?</a>
        <button type='submit' className='login-button'>Login</button>
      </form>
    </div>
  );
}

export default Login;
