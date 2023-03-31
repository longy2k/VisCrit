import React, { useEffect, useState} from 'react'
import RubricBox from "./RubricBox";
import Data_Extractor from "./Data_Extract";
import DocumentReader from "./DocumentReader";
import { ItemContext } from "./ItemContext";
// import * as XLSX from 'xlsx';
import "../assets/css/UserPage.css";
import AnnotateScript from './AnnotateScript';

export default function UserPage() {
    const [currentItem, setItem] = useState({});
    const [Hierarchy, setHierarchy] = useState([]);

    useEffect(() => {
      fetch('/api/upload/json')
        .then(response => response.json())
        .then(jsonData => {
          console.log("Path: " + jsonData.path);
          setHierarchy(Data_Extractor(jsonData));
        });
    }, []);
    
    return (
        <div>
            <div className="userPage" >
              <ItemContext.Provider value={{currentItem, setItem, Hierarchy, setHierarchy}}>
                <DocumentReader /> {/* Show pdf files*/}
                <RubricBox  />
                {/* <AnnotateScript/> Show png files */}
               </ItemContext.Provider>
            </div>
        </div>
    )
}
