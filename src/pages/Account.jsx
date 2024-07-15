import React from 'react';
import deeptimizeLogo from '../assets/images/deeptimize-logo.svg';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Account = () => {

    const navigate = useNavigate();

    const handleForgotPassword = () => {
      navigate('/forgot');
    };

  return (
    <div>
    <Navbar />
    <div className='login-container'>
      <form className='login-form'>
      <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' required />
        </div>
      <div className='form-group'>
          <label htmlFor='job'>Job:</label>
          <input type='text' id='job' name='job' required />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Mail:</label>
          <input type='email' id='email' name='email' required />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' required />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone Number:</label>
          <input type='phone' id='phone' name='phone' required />
        </div>

        <button type='submit' className='login-button'>Save</button>
      </form>
    </div>
    </div>
  )
}

export default Account
