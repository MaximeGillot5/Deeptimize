import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisOption, setAnalysisOption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAnalysisOptionChange = (event) => {
    setAnalysisOption(event.target.value);
  };

  const submitOptionsAndUpload = async () => {
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

        setIsUploading(true);
        await uploadVideo(data.upload_url);

        setIsUploading(false);
        setShowSuccessPopup(true);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error starting analysis:', error);
      alert('Error starting analysis: ' + error.message);
    }
  };

  const uploadVideo = async (uploadUrl) => {
    if (!uploadUrl) {
      alert('Upload URL not found.');
      return;
    }

    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    try {
      console.log('Uploading video to:', uploadUrl);

      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          "Content-Type": ""
        },
        body: selectedFile,
      });

      console.log('Upload response status:', response.status);

      if (response.ok) {
        console.log('Video uploaded successfully!');
      } else {
        console.error('Error response from server:', response);
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        alert(`Error uploading video: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video: ' + error.message);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="upload-container">
        <h1><span className='yellow-text'>1. Upload </span> my video to be analyzed.</h1>
        <div
          className={`upload-box ${isDragActive ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className='drop-text'>Drag & Drop here</p>
          <p className='drop-text'>or</p>
          <input type="file" style={{ display: 'none' }} id="fileUpload" accept="video/*" onChange={handleFileChange} />
          <label htmlFor="fileUpload" className="upload-button">Select file</label>
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
        <div className="options-container">
        <h1><span className='yellow-text'>2. Select </span> my analysis option.</h1>
          <div className="option">
            {/* <label htmlFor="analysisOption">Analysis Option:</label> */}
            <select className='optionbar' id="analysisOption" name="analysisOption" value={analysisOption} onChange={handleAnalysisOptionChange}>
              <option value="" disabled>Select Analysis</option>
              <option value="Insight,Rugby">Insight</option>
              {/* <option value="Full Game">Full Game</option>
              <option value="Lineouts Tagging">Lineouts Tagging</option>
              <option value="Tracking Data">Tracking Data</option>
              <option value="Other">Other</option> */}
            </select>
          </div>
        </div>
        <button className="submit-button" onClick={submitOptionsAndUpload} disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Analyze !'}
        </button>
        {isUploading && <div className="loader">Loading...</div>}
      </div>
      {showSuccessPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Upload successful</h2>
            <p>You will be redirected to the results page !</p>
            <button onClick={() => window.location.href = '/results'}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
