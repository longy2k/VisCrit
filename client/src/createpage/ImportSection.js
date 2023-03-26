import React, {useState} from "react";
import * as XLSX from 'xlsx';
import axios from 'axios';
import CritqueBox from "../userpage/CritiqueBox";
import { ItemContext } from "../userpage/ItemContext";
import Data_Extractor from "../userpage/Data_Extract";

export default function RubricSection(){

  const [jsonData, setJsonData] = useState(null);

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
              {jsonData.map((item, index) => (
                <div key={index}>
                  <div className="rubricBlock">
                    <p>{item.RubricID}</p>
                    <p>{item.CatLevel01}</p>
                    <p>{item.CatLevel_Item}</p>
                    <p>{item.CatLevel_Item_DisplayText}</p>
                    <p>{item.CatLevel02}</p>
                    <p>{item.CatLevel02_DefaultStateOpen}</p>
                    <p>{item.CatLevel02_DisplayText}</p>
                    <p>{item.CatLevel02_MouseOverText}</p>
                    <p>{item.CatLevel_Item}</p>
                    <p>{item.CatLevel_Item_DisplayText}</p>
                    <p>{item.CatLevel_Item_MouseOverText}</p>
                    <p>{item.HasLikert}</p>
                    <p>{item.HasLocation}</p>
                    <p>{item.MustEnterCritique}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  )
}
