import React, { useEffect } from "react";

export default function UploadButton({ onUpload }) {
  const handleUploadButtonClick = () => {
    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.accept = ".xlsx, .xls, .csv, .pdf, .jpeg, .png";
    uploadInput.multiple = true;
    uploadInput.onchange = onUpload;
    uploadInput.click();
  };
  // Fetch hierarchy and directory information on component mount, hierarchy is the excel file, fileUploaded is the PDF or image
  useEffect(() => {
    fetch(serverUrl + "/api/upload/json")
      .then((response) => response.json())
      .then((jsonData) => {
        //console.log("Path: " + jsonData.path);
        setHierarchy(Data_Extractor(jsonData));
      });

    fetch(serverUrl + "/api/checkdirectory")
      .then((response) => response.json())
      .then((data) => {
        setDirectoryExists(data);
      });
  }, [fileUploaded]);
  return (
    <button className="uploadButton" onClick={handleUploadButtonClick}>
      Upload
    </button>
  );
}