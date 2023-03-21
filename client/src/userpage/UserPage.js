import React, { useEffect, useState} from 'react'
import DocumentReader from "./DocumentReader";
import RubricBox from "./RubricBox";
import Critque from "./CritiqueBox";
import Data_Extractor from "./Data_Extract";
import { ItemContext } from "./ItemContext";
import * as XLSX from 'xlsx';

import "../assets/css/UserPage.css";

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
                <DocumentReader />
                <RubricBox  />
               </ItemContext.Provider>
            </div>
        </div>
    )
}
