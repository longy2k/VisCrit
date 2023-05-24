import React, { useEffect, useState } from "react";
import RubricBox from "./RubricBox";
import Data_Extractor from "./Data_Extract";
import DocumentReader from "./DocumentReader";
import { ItemContext } from "./ItemContext";
import "../assets/css/UserPage.css";
import * as XLSX from "xlsx";
import axios from "axios";
//import UserGuide from "./Guide";
import jsPDF from "jspdf";

const UploadButton = ({ onUpload }) => {

  const [fileUploaded, setFileUploaded] = useState(false);
  const [Hierarchy, setHierarchy] = useState([]);
  const serverUrl = "https://viscritbackend.onrender.com";
  const [directoryExists, setDirectoryExists] = useState(false);

  const handleUploadButtonClick = () => {
    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.accept = ".xlsx, .xls, .csv, .pdf, .jpeg, .png";
    uploadInput.multiple = true;
    uploadInput.onchange = readUploadFile;
    uploadInput.click();
  };

  // Function to read and process the uploaded file
  const readUploadFile = async (e) => {
    e.preventDefault();
    const files = e.currentTarget.files;
    
    // Function to convert an image file to PDF so it is compatible with DocumentReader
    const convertToPDF = async (imageFile, targetWidth, targetHeight, scale, quality) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const image = new Image();
      image.src = URL.createObjectURL(imageFile);

      return new Promise((resolve) => {
        image.onload = () => {
          const scaledWidth = image.width * scale;
          const scaledHeight = image.height * scale;
          canvas.width = scaledWidth;
          canvas.height = scaledHeight;
          context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

          const finalCanvas = document.createElement("canvas");
          const finalContext = finalCanvas.getContext("2d");
          finalCanvas.width = targetWidth;
          finalCanvas.height = targetHeight;
          finalContext.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, targetWidth, targetHeight);

          const dataURL = finalCanvas.toDataURL("image/jpeg", quality);
          const doc = new jsPDF();
          doc.addImage(dataURL, "JPEG", 0, 0);
          const pdfBlob = doc.output("blob");
          resolve(pdfBlob);
        };
      });
    };

    if (files.length >= 2) {
      const reader = new FileReader();

      for (const file of files) {
        if (file.type === "application/vnd.ms-excel" ||
            file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.type === "text/csv") {
          reader.onload = async (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            console.log(json);
            const formData = new FormData();
            formData.append("file", 
              new Blob([JSON.stringify(json, null, 2)], 
              { type: "application/json",}),
              file.name.replace(/\.[^/.]+$/, ".json"));
            try {
              const response = await axios.post(serverUrl+"/api/upload/", formData);
              console.log(response.data);
            } catch (error) {
              console.error(error);
            }
          };
          reader.readAsArrayBuffer(file);
        } 
        else if (file.type === "application/pdf") {
          const formData = new FormData();
          formData.append("file", file, file.name);
          try {
            const response = await axios.post(serverUrl+"/api/upload/", formData);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        } 
        else if (file.type === "image/jpeg" || file.type === "image/png") {
          const pdfBlob = await convertToPDF(file, 800, 500, 1, 1);
          const formData = new FormData();
          formData.append("file", pdfBlob, file.name.replace(/\.[^/.]+$/, ".pdf"));
          try {
            const response = await axios.post(serverUrl+"/api/upload/", formData);
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

    // Fetch hierarchy and directory information on component mount, hierarchy is the excel file, fileUploaded is the PDF or image
    useEffect(() => {
      fetch(serverUrl + "/api/upload/json")
        .then((response) => response.json())
        .then((jsonData) => {
          setHierarchy(Data_Extractor(jsonData));
        });
  
      fetch(serverUrl + "/api/checkdirectory")
        .then((response) => response.json())
        .then((data) => {
          setDirectoryExists(data);
        });
    }, []); // Remove fileUploaded dependency
  
  return (
    <div className="buttonDiv">
      <button className="uploadButton" onClick={handleUploadButtonClick}>
        Upload
      </button>
    </div>
  );
};

export default UploadButton;
