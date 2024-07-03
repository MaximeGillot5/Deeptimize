import React from 'react'
import Navbar from '../components/Navbar'

const Help = () => {
  return (
    <div>
      <Navbar />
      <div className='help-title'>
        <h1><span className='blue-text'>FAQ</span> & Help</h1>
      </div>
      <div className='help-text'>
        <div className="qa-container">
          <div className="qa-item">
            <p>1. What <span className='blue-text'>types of analysis </span>does the platform offer ?</p>
            <p>Our platform provides training session analysis, lineout analysis, full game analysis, tracking data, and kick reception analysis. </p>
          </div>
          <div className="qa-item">
            <p>2. How do I <span className='blue-text'>upload a video</span> for analysis?</p>
            <p>After logging in, navigate to the upload page, select the video file you want to upload, and choose the type of analysis you require. Click "Analyze!" to start the process. </p>
          </div>
          <div className="qa-item">
            <p>3. How do I <span className='blue-text'>access my analysis</span> results?</p>
            <p>Your analysis file are  available in the data page (button under the  "Analyze!" button). A simple click on an analysis file will launch the download of the file on your computer.</p>
          </div>
          <div className="qa-item">
            <p>4. What <span className="blue-text">video file formats</span> are supported for video uploads?</p>
            <p>Our platform supports common video formats such as MP4, AVI, and MOV. Please ensure your video is in one of these formats before uploading.</p>
          </div>
          <div className="qa-item">
            <p>5. How long does it take for the AI to <span className="blue-text">process and analyze a video</span>?</p>
            <p>Processing time can vary based on the length and quality of the video, as well as the type of analysis selected. An analysis should last between 15 and 30 minutes.</p>
          </div>
          <div className="qa-item">
            <p>6. Can I <span className="blue-text">update my user</span> information?</p>
            <p>You can update your personal information by going to the user parameters page. Here, you can change your email, password, and other details as well as your logo.</p>
          </div>
          <div className="qa-item">
            <p>7. What should I do if I <span className='blue-text'>encounter an issue</span> with my video upload or analysis?</p>
            <p>If you experience any problems, please read this support page or contact <a href="mailto:antoine.pirovano@deeptimize.com">Antoine</a> by mail for assistance. Provide as much detail as possible about the issue you are facing.</p>
          </div>
          <div className="qa-item">
            <p>8. How <span className="blue-text">secure</span> is my data on the platform?</p>
            <p>We take data security very seriously. Our platform uses secure servers to protect your data. For more details, please read our privacy policy. After the analysis we do not keep your video on our servers.</p>
          </div>
          <div className="qa-item">
            <p>9. Is there a <span className="blue-text">limit to the number or size</span> of videos I can upload?</p>
            <p>Currently, there may be limits based on your subscription plan. Please check the details of your plan on your contract or contact support if you have specific requirements regarding video uploads.</p>
          </div>
          <div className="qa-item">
            <p>10. Can I <span className="blue-text">request a specific type of analysis</span> not listed on your platform?</p>
            <p>If you need a custom analysis not currently offered, please contact our support team to discuss your requirements. We may be able to accommodate special requests.</p>
          </div>
          <div className="qa-item">
            <p>11. How do I <span className="blue-text">use the analysis</span> results provided by the platform?</p>
            <p>The XML files that can be downloaded from the data page are adapted to be uploaded to most standard video and performance analysis software such as Hudl/SportsCode, DartFish or TechXV.</p>
          </div>
          <div className="qa-item">
            <p>12. Can I <span className="blue-text">share my analysis</span> results with my team or colleagues?</p>
            <p>You can easily share your analysis results by downloading the files from the data record page and distributing them to your team or colleagues.</p>
          </div>
          <div className="qa-item">
            <p>13. How can i <span className="blue-text">upgrade my subscription</span> plan?</p>
            <p>If you are interested in acquiring access to more analysis and/or other type of analysis, contact <a href="mailto:xavier.chauveau@deeptimize.com">Xavier</a>.</p>
          </div>
          <div className="qa-item">
            <p>If this FAQ/Help page, do not provide sufficient or satisfactory answer to your question, please <a href="mailto:antoine.pirovano@deeptimize.com">contact us.</a></p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Help
