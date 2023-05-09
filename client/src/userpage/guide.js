import React, { useState } from 'react';
import "../assets/css/UserPage.css";
import uploadimg from '../images/upload.png';
import cat from '../images/category.png';
import loc from '../images/location.png';
import comment from '../images/comment.png';

const UserGuide = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="user-guide-container">
      <h1 className="user-guide-heading">VisCrit User Guide</h1>
      <div className="user-guide-tabs-container">
        <button className={`user-guide-tab ${activeTab === 0 && 'active'}`} onClick={() => handleTabClick(0)}>Uploading</button>
        <button className={`user-guide-tab ${activeTab === 1 && 'active'}`} onClick={() => handleTabClick(1)}>Selection</button>
        <button className={`user-guide-tab ${activeTab === 2 && 'active'}`} onClick={() => handleTabClick(2)}>Rating and location</button>
        <button className={`user-guide-tab ${activeTab === 3 && 'active'}`} onClick={() => handleTabClick(3)}>Making annotations</button>
        
        
      </div>
      <div className="user-guide-content">
        {activeTab === 0 && (
          <div>
            <h2>Step 1: Getting Started</h2>
            <p>First you have to upload your files</p>
            <img className='picture' src={uploadimg} ></img>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <h2>Step 2: Next you have to </h2>
            <p>Choose a critqueID and select a category</p>
            <img className='picture' src={cat} ></img>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2>Step 3: Rating and location</h2>
            <p>To choose a rating and a location:</p>
            <img className='picture' src={loc} ></img>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2>Step 4: Making annotations</h2>
            <p>After choosing a rating and location you can now highlight the text you want and leave a comment </p>
            <img className='picture' src={comment} ></img>
          </div>
        )}
        
        
        
         
      </div>
      
    </div>
  );
};

export default UserGuide;