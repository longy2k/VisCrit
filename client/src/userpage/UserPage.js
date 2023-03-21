import React, { useEffect, useState} from 'react'
import RubricBox from "./RubricBox";
import Data_Extractor from "./Data_Extract";
import { ItemContext } from "./ItemContext";
import * as XLSX from 'xlsx';
import "../assets/css/UserPage.css";
import AnnotateScript from './AnnotateScript';

export default function UserPage() {
    const[jsonData, setData] = useState([]);
    const [currentItem, setItem] = useState({});

    useEffect(() => {
      fetch('/api/upload/json')
        .then(response => response.json())
        .then(jsonData => {
          console.log("Path: " + jsonData.path);
          setData(jsonData);
        });
    }, []);

    console.log(jsonData);

    const Hierarchy = Data_Extractor(jsonData);

    return (
        <div>
            <div className="userPage" >
                <ItemContext.Provider value={{currentItem, setItem, Hierarchy}}>
                    <RubricBox/>
                    <AnnotateScript/>
                </ItemContext.Provider>
            </div>
        </div>
    )
}
