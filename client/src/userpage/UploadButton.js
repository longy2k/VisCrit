import React from "react";

export default function UploadButton({ onUpload }) {
  const handleUploadButtonClick = () => {
    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.accept = ".xlsx, .xls, .csv, .pdf, .jpeg, .png";
    uploadInput.multiple = true;
    uploadInput.onchange = onUpload;
    uploadInput.click();
  };

  return (
    <button className="uploadButton" onClick={handleUploadButtonClick}>
      Upload
    </button>
  );
}