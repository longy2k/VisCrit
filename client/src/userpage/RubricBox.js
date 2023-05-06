import React, { useEffect, useState, useContext, useRef } from 'react'
import { ItemContext } from "./ItemContext"
import { CSVLink } from "react-csv";
import Draggable from 'react-draggable';

export default function RubricBox() {
  let { totalItems, Hierarchy, pageNumber, setPageNumber, numPages } = useContext(ItemContext);
  const [dirjsonExists, setdirjsonExists] = useState(false);
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);
  const [isTransitioning, setTransitioning] = useState(false);
  const buttonText = isOpen ? 'Collapse' : 'Show';

  const handleClick = () => {
    if (isOpen) {
      setOpen(false);
      setTransitioning(true);
    } else {
      setOpen(true);
    }
  };

  function handleExport(event) {
    const confirmed = window.confirm('Are you sure you want to export the results?');
    if (!confirmed) {
      event.preventDefault(); // prevent the default behavior of the onClick event
    }
  }

  useEffect(() => {
    fetch('/api/checkdirectory/upload/json')
    .then(response => response.json())
    .then(data => {
      setdirjsonExists(data);
    });
  }, []);

  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  }

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  }

  if (dirjsonExists) {
    return (
    <div className="rubricBoxContainer">
      <h3>Available Categories</h3>
      <div className='rubricBox'>
        {Hierarchy.map((item, i) => <div key={i}>{item.returnHTML()}</div>)}
      </div>
      <div className="bottomContainer">
        <div className="pageNavigation">
          <button 
            className='leftButton'
            disabled={pageNumber <= 1} 
            onClick={handlePreviousPage}>
            &#8592;  
          </button>

          <button 
            className='rightButton'
            disabled={pageNumber >= numPages}
            onClick={handleNextPage}>
            &#8594;  
          </button>
        </div>
        <CSVLink 
          data={totalItems}
          filename={"Export_Results.csv"}
          className='csvLink'
          onClick={handleExport}
        >
          Export
        </CSVLink>
      </div>
    </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}