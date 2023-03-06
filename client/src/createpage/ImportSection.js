import React, {useState} from "react";
import * as XLSX from 'xlsx';

export default function RubricSection(){

  const [jsonData, setJsonData] = useState(null);

  const readUploadFile = (e) => {
      e.preventDefault();
      if (e.target.files) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const data = e.target.result;
              const workbook = XLSX.read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const json = XLSX.utils.sheet_to_json(worksheet);
              setJsonData(json[0]);
              console.log(json);
          };
          reader.readAsArrayBuffer(e.target.files[0]);
      }
  }

  return (
      <div className="importSection">
        <form>
            <label htmlFor="upload">Import</label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
            />
        </form>
        <div className="json-container">
          {jsonData && (
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          )}
        </div>
      </div>
  )
}
