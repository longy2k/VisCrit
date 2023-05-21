import React, { useEffect, useState } from "react";
import Data_Extractor from "./Data_Extract";
import axios from "axios";

export default function UploadButton({ onUpload }) {
  const serverUrl = "https://viscritbackend.onrender.com";
  const [Hierarchy, setHierarchy] = useState([]);
  const [directoryExists, setDirectoryExists] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleUploadButtonClick = async () => {
    const files = document.createElement("input");
    files.type = "file";
    files.accept = ".xlsx, .xls, .csv, .pdf, .jpeg, .png";
    files.multiple = true;

    files.addEventListener("change", async (e) => {
      const uploadedFiles = e.target.files;
      await uploadFiles(uploadedFiles);
      setFileUploaded(true);
      if (onUpload) {
        onUpload();
      }
    });

    files.click();
  };

  const uploadFiles = async (files) => {
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file, file.name);

      try {
        const response = await axios.post(serverUrl + "/api/upload/", formData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

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
  }, [fileUploaded]);

  return (
    <button className="uploadButton" onClick={handleUploadButtonClick}>
      Upload
    </button>
  );
}
