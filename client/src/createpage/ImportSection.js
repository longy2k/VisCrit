import React, {useState} from "react";
import * as XLSX from 'xlsx';
import axios from 'axios';

export default function RubricSection(){

  const [jsonData, setJsonData] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [participantsData, setParticipantsData] = useState([]);

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
        
        const participantsSheetName = workbook.SheetNames[3];
        const participantsWorksheet = workbook.Sheets[participantsSheetName];
        const jsonData = XLSX.utils.sheet_to_json(participantsWorksheet);
        setParticipantsData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Email Submission

  // const [to, setTo] = useState('');
  // const [subject, setSubject] = useState('');
  // const [text, setText] = useState('');

  // const handleSubmit = () => {
  //   const to = participantsData.map((participant) => participant.EMAIL).join(',');
  //   axios.post('/send-email', { to, subject, text })
  //     .then((response) => {
  //       console.log(response.data);
  //       window.location.href = '/view/';
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  

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
        {/* <div className="json-container">
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

            <div className="participantsBlock">
              <h2>Participants</h2>
              {participantsData.map((participant, index) => (
                <div key={index} className="participants">
                  {participant.EMAIL}<br />
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{participant.GroupID}</span><br />
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{participant.CritiquerIDs}</span><br/>
                </div>
              ))}
            </div>
          </div>
        )}
            {fileUploaded && (
              <button className="generalButton" style ={{float:"right", marginBottom:"3em"}} onClick={handleSubmit}>
                Send
              </button>
            )}
        </div> */}
      </div>
  )
}
