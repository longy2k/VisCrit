import React, {useState} from "react";
import DocReader from "./DocumentReader";
import Rubric from "./RubricBox";
import Critque from "./CritiqueBox";
import { ItemContext } from "./ItemContext";
import * as XLSX from 'xlsx';
import Data_Extractor from "./Data_Extract";

import "../assets/css/UserPage.css";

export default function UserPage() {
    const[jsonData, setData] = useState([]);
    const [currentItem, setItem] = useState({});
    const handleFile = async(e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[3]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1, blankrows:false})
        setData(jsonData)
    }
    const Hierarchy = Data_Extractor(jsonData);

    return (
        <div>
            <input type="file" onChange={(e) => handleFile(e)}/>
            <button onClick={(e) => {console.log(Hierarchy)}}>Test</button>
            <div className="userPage" >
                <ItemContext.Provider value={{currentItem, setItem, Hierarchy}}>
                    <DocReader />
                    <Rubric  />
                </ItemContext.Provider>
            </div>
        </div>
    )
}
