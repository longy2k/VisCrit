import React, {useState} from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF"];
export default function UploadSection(){
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    }
    return (
        <div className="uploadSection">
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        </div>
    )
}