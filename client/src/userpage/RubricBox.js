import React, { useEffect, useState, useContext, useRef } from 'react'
import { ItemContext } from "./ItemContext"
import { CSVLink } from "react-csv";
import axios from 'axios';

export default function RubricBox() {
  let { totalItems, Hierarchy, pageNumber, setPageNumber, numPages ,critiquerID, setCritiquerID, setHierarchy, setTotalItems} = useContext(ItemContext);
  const [dirjsonExists, setdirjsonExists] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [json, setJSON] = useState("false");
  const [isTransitioning, setTransitioning] = useState(false);


  const handleOptionChange = (event) => {
    if(totalItems.length === 0){
      setCritiquerID(event.target.value);
    }
  };

  async function loadHandler(e){
    const jsonFile = e.currentTarget.files;
    const reader = new FileReader();
    reader.onload = function (e){
      setJSON(JSON.parse(reader.result))      
    }
    reader.readAsText(jsonFile[0]);
  }

  useEffect(() => {
    Load_Data()
    setTotalItems(json[1])
    setCritiquerID(json[2])
  }, [json]);

  /*Traversing the Hierarchy to replace with new values, very inefficient */
  function Load_Data(){
    for(let i=0; i<Hierarchy.length; i++){
      for(let j=0; j<Hierarchy[i].itemList.length; j++){
        Hierarchy[i].itemList[j].Comment = json[0][i].itemList[j].Comment;
        Hierarchy[i].itemList[j].LocationRt = json[0][i].itemList[j].LocationRt;
      }
      for(let n =0; n<Hierarchy[i].subHierNames.length; n++){
        for(let m=0; m<Hierarchy[i].subHierList.get(Hierarchy[i].subHierNames[n].itemList.length); m++){
          Hierarchy[i].subHierList.get(Hierarchy[i].subHierNames[n]).itemList[m].Comment = json[0][i].subHierList.get(Hierarchy[i].subHierNames[n]).itemList[m].Comment;
          Hierarchy[i].subHierList.get(Hierarchy[i].subHierNames[n]).itemList[m].LocationRt = json[0][i].subHierList.get(Hierarchy[i].subHierNames[n]).itemList[m].LocationRt;
        }
      }
    }
}
  const handleClick = () => {
    if (isOpen) {
      setOpen(false);
      setTransitioning(true);
    } else {
      setOpen(true);
    }
  };

  const handleExport = async (event) => {
    const confirmed = window.confirm('Are you sure you want to export the results?');
    if (!confirmed) {
      event.preventDefault();
      return;
    }
    try {
      const fusionObject = [Hierarchy, totalItems, critiquerID]
      const HJSON = JSON.stringify(fusionObject);
      const jsonData = new FormData();
      const headers = Object.keys(totalItems[0]);
      const csvData = `${headers.join(',')}\n${totalItems.map(item => headers.map(header => item[header]).join(',')).join('\n')}`;
      const formData = new FormData();
      formData.append('file', new Blob([csvData], { type: 'text/csv' }), critiquerID + "_"+'Export_Results.csv');
      jsonData.append('file', new Blob([HJSON], { type: 'application/json' }), critiquerID + "_"+"JSONData.json");
      const response = await axios.post('/api/upload/', formData);
      const jsonResponse = await axios.post('/api/upload/', jsonData);
      console.log(response.data);
      console.log(jsonResponse);
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
      <label htmlFor="cars"> CritiquerID: </label>
      <select id="cars" name="cars" value={critiquerID} onChange={handleOptionChange}>
        <option value=""></option>
        <option value="001">001</option>
        <option value="002">002</option>
        <option value="003">003</option>
      </select>
      <div>
        <input type="file" onChange={(e) => loadHandler(e)} />
      </div>
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