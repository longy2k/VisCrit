import React, { useState } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF", "IMG", "JPG", "JPEG"];

export default function UploadSection() {
  const [file, setFile] = useState(null);

  const handleChange = async (file) => {
    setFile(file);
    console.log(file.name);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await axios.post("/api/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("File uploaded successfully!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="uploadSection">
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
  );
}
