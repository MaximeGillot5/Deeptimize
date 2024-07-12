import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisOption, setAnalysisOption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedBytes, setUploadedBytes] = useState(0);

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
        const url = new URL('/upload-api/async/', window.location.href); // Utilisation de /upload-api/async/ pour l'analyse asynchrone

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
        } else {
            alert(`Error: ${data.message}`);
            return;
        }
    } catch (error) {
        console.error('Error starting analysis:', error);
        alert('Error starting analysis: ' + error.message);
        setIsUploading(false);
        return;
    }
};

  
  const uploadVideo = async (uploadUrl) => {
    if (!uploadUrl) {
      alert('Upload URL not found.');
      setIsUploading(false);
      return;
    }
  
    if (!selectedFile) {
      alert('Please select a file to upload');
      setIsUploading(false);
      return;
    }
  
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', uploadUrl, true);
      xhr.setRequestHeader('Content-Type', '');
      // xhr.setRequestHeader('Content-Length', selectedFile.size.toString());
  
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const uploaded = event.loaded;
          const progress = Math.round((uploaded / selectedFile.size) * 100);
          console.log(`Uploaded ${uploaded} bytes (${progress}% completed)`);
          setUploadProgress(progress);
          setUploadedBytes(uploaded);
          setIsUploading(true)
        }
      };
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log('Video uploaded successfully!');
          setShowSuccessPopup(true);
        } else {
          console.error('Error response from server:', xhr.statusText);
          alert(`Error uploading video: ${xhr.statusText}`);
        }
        setIsUploading(false);
      };
  
      xhr.onerror = () => {
        console.error('Error uploading video:', xhr.statusText);
        alert(`Error uploading video: ${xhr.statusText}`);
        setIsUploading(false);
      };
  
      setIsUploading(true);
      xhr.send(selectedFile);
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video: ' + error.message);
      setIsUploading(false);
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

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        {isUploading && (
          <p className='white-text'>Uploading... {formatBytes(uploadedBytes)} / {formatBytes(selectedFile.size)}</p>
        )}
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
