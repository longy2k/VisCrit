import React, { useEffect, useState} from 'react'
import RubricBox from "./RubricBox";
import Data_Extractor from "./Data_Extract";
import DocumentReader from "./DocumentReader";
import { ItemContext } from "./ItemContext";
import "../assets/css/UserPage.css";

export default function UserPage() {
    const [currentItem, setItem] = useState({});
    const [Hierarchy, setHierarchy] = useState([]);
    const [accessCanvas, setAccessCanvas] = useState(false);
    const [rectangles, setRectangles] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [reRender, setReRender] = useState(null);
    const [index, setIndex] = useState(-1);
    const [totalItems, setTotalItems] = useState([]);
    
    useEffect(() => {
      fetch('/api/upload/json')
        .then(response => response.json())
        .then(jsonData => {
          console.log("Path: " + jsonData.path);
          setHierarchy(Data_Extractor(jsonData));
        });
    }, []);
    
    return (
        <div className='userPage'>
              <ItemContext.Provider value={{totalItems, setTotalItems, currentItem, setItem, Hierarchy, setHierarchy, pageNumber, setPageNumber, index, setIndex, rectangles, setRectangles, accessCanvas, setAccessCanvas,reRender, setReRender}}>
                <DocumentReader/>
                <RubricBox  />
               </ItemContext.Provider>
        </div>
    )
}
