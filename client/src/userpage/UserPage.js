import React, { useEffect, useState} from 'react';
import RubricBox from "./RubricBox";
import Data_Extractor from "./Data_Extract";
import DocumentReader from "./DocumentReader";
import { ItemContext } from "./ItemContext";
import "../assets/css/UserPage.css";
import * as XLSX from 'xlsx';
import axios from 'axios';

import UserGuide from './guide';
export default function UserPage() {
  const [currentItem, setItem] = useState({});
  const [Hierarchy, setHierarchy] = useState([]);
  const [accessCanvas, setAccessCanvas] = useState(false);
  const [rectangles, setRectangles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [reRender, setReRender] = useState(null);
  const [index, setIndex] = useState(-1);
  const [totalItems, setTotalItems] = useState([]);
  const [directoryExists, setDirectoryExists] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [locked , setLock] = useState(false);

  const readUploadFile = async (e) => {
    e.preventDefault();
    const files = e.currentTarget.files;
    if (files.length >= 2) {
      const reader = new FileReader();
  
      for (const file of files) {
        if (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "text/csv") {
          reader.onload = async (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            console.log(json);
    
            // Upload JSON file to server
            const formData = new FormData();
            formData.append('file', new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' }), file.name.replace(/\.[^/.]+$/, ".json"));
            try {
              const response = await axios.post('/api/upload/', formData);
              console.log(response.data);
            } catch (error) {
              console.error(error);
            }
          };
          reader.readAsArrayBuffer(file);
        } else if (file.type === "application/pdf" || file.type === "image/jpeg" || file.type === "image/png") {
          // Upload file to server
          const formData = new FormData();
          formData.append('file', file, file.name);
          try {
            const response = await axios.post('/api/upload/', formData);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error("Invalid file type.");
        }
      }
    }
    setFileUploaded(true);
  };


  const handleUploadButtonClick = (e) => {
    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.accept = '.xlsx, .xls, .csv, .pdf, .jpeg, .png';
    uploadInput.multiple = true;
    uploadInput.onchange = readUploadFile;
    uploadInput.click();
  }

  useEffect(() => {
    fetch('/api/upload/json')
      .then(response => response.json())
      .then(jsonData => {
        console.log("Path: " + jsonData.path);
        setHierarchy(Data_Extractor(jsonData));
      });

    fetch('/api/checkdirectory')
      .then(response => response.json())
      .then(data => {
        setDirectoryExists(data);
      });
  }, [fileUploaded]);

  if (directoryExists) {
    return (
      <div className='userPage'>
        <ItemContext.Provider value={{totalItems, setTotalItems, currentItem, setItem, Hierarchy, setHierarchy, pageNumber, setPageNumber, index, setIndex, rectangles, setRectangles, accessCanvas, setAccessCanvas,reRender, setReRender, locked, setLock}}>
          <DocumentReader/>
          <RubricBox/>
        </ItemContext.Provider>

      </div>
    );
  } else {
    return (
      <div>
      <div className="directoryNotFound">
        <h1 className="noUploadViscrit">VISCRIT</h1>
        <p className="noUploadText">Please upload your files.</p>
        <button className="uploadButton" onClick={handleUploadButtonClick}>Upload</button>
        </div>
        <div className='distance-from-top'>
        <UserGuide/>
        </div>
        
        </div>
    );
  }
}