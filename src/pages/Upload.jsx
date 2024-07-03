import React from 'react'
import Navbar from '../components/Navbar'

const Upload = () => {
  return (
    <div>
      <Navbar />
      <div className="upload-container">
      <h1><span className='yellow-text'>1. Upload </span> my video to be analyzed</h1>
        <div className="upload-box">
          <p className='drop-text'>Drag & Drop here</p>
          <p className='drop-text'>or</p>
          <button className="upload-button">Select file</button>
        </div>
        <h1><span className='yellow-text'>2. Select </span> my analysis option.</h1>
        <div className="analysis-options">
          <select className="analysis-option" name="analysisOption">
          <option value="" disabled selected>Select Analysis</option>
            <option value="option1">Training Session</option>
            <option value="option2">Full Game</option>
            <option value="option3">Lineouts Tagging</option>
            <option value="option4">Tracking Data</option>
            <option value="option5">Other</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Upload
