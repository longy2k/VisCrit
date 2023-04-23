import React, {useState} from "react"
import * as XLSX from 'xlsx';
import axios from 'axios';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import UserPage from "./userpage/UserPage";
import './assets/css/NavBar.css';

export default function NavBar() {
    const [jsonData, setJsonData] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [participantsData, setParticipantsData] = useState([]);

    const readUploadFile = async (e) => {
      e.preventDefault();
      const files = e.currentTarget.files;
      if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
    
        if (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "text/csv") {
          reader.onload = async (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            setJsonData(json);
            setFileUploaded(true);
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
    
            const participantsSheetName = workbook.SheetNames[3];
            const participantsWorksheet = workbook.Sheets[participantsSheetName];
            const jsonData = XLSX.utils.sheet_to_json(participantsWorksheet);
            setParticipantsData(jsonData);
            window.location.reload();
          };
          reader.readAsArrayBuffer(file);
        } else if (file.type === "application/pdf" || file.type === "image/jpeg" || file.type === "image/png") {
          // Upload file to server
          const formData = new FormData();
          formData.append('file', file, file.name);
          try {
            const response = await axios.post('/api/upload/', formData);
            console.log(response.data);
            window.location.reload();
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error("Invalid file type.");
        }
      }
    };
    

    const handleUploadButtonClick = (e) => {
      const uploadInput = document.createElement('input');
      uploadInput.type = 'file';
      uploadInput.accept = '.xlsx, .xls, .csv, .pdf, .jpeg, .png';
      uploadInput.multiple = false;
      uploadInput.onchange = readUploadFile;
      uploadInput.click();
    }

    return (
        <Router>
          <div className="navBar">
            <ul>
                <li><Link to="/"><span id="logo">VisCrit</span></Link></li>
                <li><button className="uploadButton" onClick={handleUploadButtonClick}>Upload</button></li>
            </ul>
          </div>
          <Routes>
              <Route exact path='/' element={< UserPage />}></Route>
          </Routes>
        </Router>
    )
}
