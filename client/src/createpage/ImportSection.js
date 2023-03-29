import React, {useState} from "react";
import * as XLSX from 'xlsx';
import axios from 'axios';
import CritqueBox from "../userpage/CritiqueBox";
import { ItemContext } from "../userpage/ItemContext";
import Data_Extractor from "../userpage/Data_Extract";

export default function RubricSection(){

  const [jsonData, setJsonData] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const readUploadFile = async (e) => {
    e.preventDefault();
    const files = e.currentTarget.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
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
      };
      reader.readAsArrayBuffer(file);
    }
  };

  function handleSendButtonClick() {
    // alert("SENT! (sort of, not really)");
  }

  return (
      <div className="importSection">
        <form>
            <label htmlFor="upload">
              Import
            </label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
            />
        </form>
        <div className="json-container">
        {jsonData && (
          <div>
            <h2>Overview</h2>
            {jsonData.reduce((groups, item, index) => {
              if (index === 0 || item.CatLevel01 !== jsonData[index - 1].CatLevel01) {
                groups.push([]);
              }
              groups[groups.length - 1].push(item);
              return groups;
            }, []).map((group, index) => (
              <div key={index} className="groupedRubricBlock">
                <div className="rubricCategory">{group[0].CatLevel01}</div>
                {group.map((item, index) => (
                  <div key={index} className="rubricBlock">
                    <p>{item.CatLevel01_DisplayText}: {item.CatLevel_Item_DisplayText}</p>
                    {item.CatLevel02_DisplayText !== "NULL" && (
                      <p>{Object.keys(item)[8]}: {item.CatLevel02_DisplayText}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <h2>Participants (ADD EMAIL COMPONENT BELOW)</h2>
            {fileUploaded && (
              <a href="/view/"><button className="sendButton" onClick={handleSendButtonClick}>
                Send
              </button></a>
            )}
        </div>
      </div>
  )
}
