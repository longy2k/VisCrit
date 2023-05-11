import React, { useState } from 'react';
import "../assets/css/UserPage.css";
import uploadimg from '../images/upload.png';
import cat from '../images/category.png';
import loc from '../images/location.png';
import comment from '../images/comment.png';

const UserGuide = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getContentTransform = () => {
    return `translateX(-${(currentPage - 1) * 36}%)`;
  };

  return (
    <div className='containerGuide'>
      <div className="user-guide-content" style={{ transform: getContentTransform() }}>
        <div>
          <h2>Step 1: Getting Started</h2>
          <p>First, you have to upload your files</p>
          <img className='picture' src={uploadimg} alt="Step 1" />
        </div>
        <div>
          <h2>Step 2: Next, you have to</h2>
          <p>Choose a critqueID and select a category</p>
          <img className='picture' src={cat} alt="Step 2" />
        </div>
        <div>
          <h2>Step 3: Rating and Location</h2>
          <p>To choose a rating and a location:</p>
          <img className='picture' src={loc} alt="Step 3" />
        </div>
        <div>
          <h2>Step 4: Making Annotations</h2>
          <p>After choosing a rating and location, you can now highlight the text you want and leave a comment</p>
          <img className='picture' src={comment} alt="Step 4" />
        </div>
      </div>

      <div className="user-guide-pagination">
        <button
          className={`arrow left ${currentPage === 1 && 'disabled'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        ></button>

        <button
          className={`arrow right ${currentPage === totalPages && 'disabled'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        ></button>
      </div>
    </div>
  );
};

export default UserGuide;




