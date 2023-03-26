import React from 'react';
import './assets/css/HomePage.css';

function HomePage() {
  return (
    <div className="homePage">
      <div className="homepage-modal">
         <h1 className="largeText">Rubric-Driven Visualization</h1>
         <div className="buttonContainer">
         <a href="/CS410_northwestern/create" className="button">Create Rubric</a>
         <a href="#" className="button">Critique</a>
         </div>
      </div>
    </div>
  );
}

export default HomePage;
