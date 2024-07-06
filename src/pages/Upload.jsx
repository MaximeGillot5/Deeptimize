import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoType, setVideoType] = useState('');
  const [analysisOption, setAnalysisOption] = useState('');
  const [isOptionsSelected, setIsOptionsSelected] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleVideoTypeChange = (event) => {
    setVideoType(event.target.value);
  };

  const handleAnalysisOptionChange = (event) => {
    setAnalysisOption(event.target.value);
  };

  const submitOptions = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('No auth token found');
      return;
    }

    if (!videoType || !analysisOption) {
      alert('Please select a video type and an analysis option');
      return;
    }

    const fileName = `example.${videoType}`;
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
        alert('Options selected successfully. You can now upload your video.');

        setIsOptionsSelected(true);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error starting analysis:', error);
      alert('Error starting analysis: ' + error.message);
    }
  };


    const uploadVideo = async () => {
      const uploadUrl = localStorage.getItem('upload_url');
      const jobId = localStorage.getItem('job_id');
    
      if (!uploadUrl || !jobId) {
        alert('Upload URL or Job ID not found. Please select options first.');
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
          alert('Video uploaded successfully!');
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
    
  return (
    <div>
      <Navbar />
      <div className="upload-container">
        {!isOptionsSelected ? (
          <>
            <h1><span className='yellow-text'>1. Select </span> Video Type and Analysis Option</h1>
            <div className="options-container">
              <div className="option">
                <label htmlFor="videoType">Video Type:</label>
                <select id="videoType" name="videoType" value={videoType} onChange={handleVideoTypeChange}>
                  <option value="" disabled>Select Video Type</option>
                  <option value="mp4">MP4</option>
                  <option value="mp5">MP5</option>
                  <option value="avi">AVI</option>
                  <option value="mov">MOV</option>
                  <option value="wmv">WMV</option>
                </select>
              </div>
              <div className="option">
                <label htmlFor="analysisOption">Analysis Option:</label>
                <select id="analysisOption" name="analysisOption" value={analysisOption} onChange={handleAnalysisOptionChange}>
                  <option value="" disabled>Select Analysis</option>
                  <option value="Training Session">Training Session</option>
                  <option value="Full Game">Full Game</option>
                  <option value="Lineouts Tagging">Lineouts Tagging</option>
                  <option value="Tracking Data">Tracking Data</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <button className="submit-button" onClick={submitOptions}>Submit Options</button>
          </>
        ) : (
          <>
            <h1><span className='yellow-text'>2. Upload </span> your video</h1>
            <div className="upload-box">
              <p className='drop-text'>Drag & Drop here</p>
              <p className='drop-text'>or</p>
              <input type="file" style={{ display: 'none' }} id="fileUpload" accept="video/*" onChange={handleFileChange} />

              <label htmlFor="fileUpload" className="upload-button">Select file</label>
            </div>
            <button className="submit-button" onClick={uploadVideo}>Upload Video</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
