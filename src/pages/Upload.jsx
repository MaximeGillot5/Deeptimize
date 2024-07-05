import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisOption, setAnalysisOption] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAnalysisOptionChange = (event) => {
    setAnalysisOption(event.target.value);
  };

  const startAnalysis = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('No auth token found');
      return;
    }

    if (!selectedFile || !analysisOption) {
      alert('Please select a file and an analysis option');
      return;
    }

    const fileName = selectedFile.name;
    const analysis = analysisOption;

    try {
      const url = new URL('https://chc27y6zqk.execute-api.eu-west-1.amazonaws.com/nonprod/analyze/async/');
      url.searchParams.append('file-name', fileName);
      url.searchParams.append('analysis', analysis);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Received job ID and upload URL:', data);
        localStorage.setItem('job_id', data.job_id);
        localStorage.setItem('upload_url', data.upload_url);
        alert('Analysis started successfully. Uploading video...');

        await uploadVideo(data.upload_url, selectedFile);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error starting analysis:', error);
      alert('Error starting analysis: ' + error.message);
    }
  };

  const uploadVideo = async (uploadUrl, file) => {
    try {
      console.log('Uploading video to:', uploadUrl);
  
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file
      });
  
      if (response.ok) {
        alert('Video uploaded successfully!');
      } else {
        console.error('Error response from server:', response);
        alert(`Error uploading video: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video: ' + error.message);
    }
  };
  
  

  return (
    <div>
      <Navbar />
      <div className="upload-container">
        <h1><span className='yellow-text'>1. Upload </span> my video to be analyzed</h1>
        <div className="upload-box">
          <p className='drop-text'>Drag & Drop here</p>
          <p className='drop-text'>or</p>
          <input type="file" style={{ display: 'none' }} id="fileUpload" onChange={handleFileChange} />
          <label htmlFor="fileUpload" className="upload-button">Select file</label>
        </div>
        <h1><span className='yellow-text'>2. Select </span> my analysis option.</h1>
        <div className="analysis-options">
          <select className="analysis-option" name="analysisOption" value={analysisOption} onChange={handleAnalysisOptionChange}>
            <option value="" disabled>Select Analysis</option>
            <option value="Training Session">Training Session</option>
            <option value="Full Game">Full Game</option>
            <option value="Lineouts Tagging">Lineouts Tagging</option>
            <option value="Tracking Data">Tracking Data</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button className="submit-button" onClick={startAnalysis}>Start Analysis</button>
      </div>
    </div>
  );
};

export default Upload;
