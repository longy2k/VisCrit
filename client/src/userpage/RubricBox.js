import React, { useEffect, useState, useContext, useRef } from 'react'
import { ItemContext } from "./ItemContext"
import { CSVLink } from "react-csv";
import axios from 'axios';

export default function RubricBox() {
  let { totalItems, Hierarchy, pageNumber, setPageNumber, numPages, setNumPages, critiquerID, setCritiquerID} = useContext(ItemContext);
  const [dirjsonExists, setdirjsonExists] = useState(false);


  const handleOptionChange = (event) => {
    if(totalItems.length === 0){
      setCritiquerID(event.target.value);
    }
  };

  const handleExport = async (event) => {
    const confirmed = window.confirm('Are you sure you want to export the results?');
    if (!confirmed) {
      event.preventDefault();
      return;
    }
    try {
      const headers = Object.keys(totalItems[0]);
      const csvData = `${headers.join(',')}\n${totalItems.map(item => headers.map(header => item[header]).join(',')).join('\n')}`;
      const formData = new FormData();
      formData.append('file', new Blob([csvData], { type: 'text/csv' }), 'Export_Results.csv');
      const response = await axios.post('/api/upload/', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
    <form>
      <label htmlFor=""> CritiquerID: </label>
      <select value={critiquerID} onChange={handleOptionChange}>
        <option value=""></option>
        <option value="001">001</option>
        <option value="002">002</option>
        <option value="003">003</option>
      </select>
    </form>

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
        <div className="logo">
          VISCRIT
        </div>
        <CSVLink 
          data={totalItems}
          filename={critiquerID + "_"+"Export_Results.csv"}
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