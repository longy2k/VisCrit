import React, { useEffect, useState, useContext } from 'react'
import { ItemContext } from "./ItemContext"

export default function RubricBox(){
    let {Hierarchy} = useContext(ItemContext)
    const [jsonData, setData] = useState({});

    useEffect(() => {
      fetch('/api/upload/json')
        .then(response => response.json())
        .then(jsonData => {
          console.log(jsonData.path);
          setData(jsonData);
        });
    }, []);

    return(
          <div className="rubricBox">
              <ul className="toolBarMenu">
                  <li><strong>Available Categories</strong></li>
              </ul>
              {Object.keys(jsonData).map((key) => (
                  <li key={key}>{key}: {JSON.stringify(jsonData[key])}</li>
              ))}
          </div>
    )
}
