import React, { useEffect, useState, useContext } from 'react'
import { ItemContext } from "./ItemContext"

export default function RubricBox(){
    let {Hierarchy} = useContext(ItemContext);

{/*    useEffect(() => {
      fetch('/api/upload/json')
        .then(response => response.json())
        .then(jsonData => {
          console.log("Path: " + jsonData.path);
          setData(jsonData);
        });
    }, []);

    console.log(JSON.stringify(jsonData, null, 2));
*/}

    return(
          <div className="rubricBox">
              <ul className="toolBarMenu">
                  <li><strong>Available Categories</strong></li>
              </ul>
              {Hierarchy.map((item, i) =>
              <div key={i}>{item.returnHTML()}</div>)}
              {/*{Object.keys(jsonData).map((key) => (
                  <li key={key}>{key}: {JSON.stringify(jsonData[key])}</li>
              ))}*/}
          </div>
    )
}
