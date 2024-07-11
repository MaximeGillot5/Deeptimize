import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import card from "../assets/images/card.svg";

const Results = () => {
  const [jobStatus, setJobStatus] = useState(null);
  const [fetchUrls, setFetchUrls] = useState([]);

  useEffect(() => {
    const fetchJobStatus = async () => {
      const jobId = localStorage.getItem('job_id');
      if (!jobId) {
        console.error('No job ID found in local storage.');
        return;
      }

      try {
        const response = await fetch(`https://chc27y6zqk.execute-api.eu-west-1.amazonaws.com/nonprod/analyze/async/${jobId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching job status: ${response.statusText}`);
        }

        const data = await response.json();
        setJobStatus(data.job_status);

        if (data.job_status === 'SUCCEEDED' && data.fetch_url) {
          const urls = JSON.parse(data.fetch_url); // Convert JSON string to array
          setFetchUrls(urls);
        }
      } catch (error) {
        console.error('Error fetching job status:', error);
      }
    };

    const interval = setInterval(() => {
      fetchJobStatus();
    }, 2000); // Actualiser toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, []);

  const getStatusMessage = (status) => {
    switch (status) {
      case 'RUNNABLE':
        return 'Analysis Pending';
      case 'STARTING':
        return 'Analysis Starting';
      case 'RUNNING':
        return 'Analysis In Progress';
      case 'SUCCEEDED':
        return 'Analysis Finished';
      default:
        return 'Unknown Status';
    }
  };

  const renderCards = () => {
    const cards = [];
    for (let i = 0; i < 10; i++) {
      cards.push(
        <div key={i} className='card'>
          <div className='div-image'>
            <img alt="Results Card" className='card-image' src={card} />
          </div>
          {jobStatus && (
            <div className='result-text'>
              <p style={{ color: 'white' }}>Status: {getStatusMessage(jobStatus)}</p>
              {jobStatus === 'SUCCEEDED' && fetchUrls.length > 1 && (
                <div className='download-buttons'>
                  <a href={fetchUrls[1]} target="_blank" rel="noopener noreferrer">
                    <button className='download-button'>Download File</button>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    return cards;
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1 className='data-title'>My <span className='green-text'>data</span> record</h1>
        <div className='cards-container'>
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

export default Results;

