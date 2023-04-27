import React, { useEffect, useState, useContext } from 'react'
import { ItemContext } from "./ItemContext"
import { CSVLink } from "react-csv";

export default function RubricBox() {
    let {totalItems, Hierarchy} = useContext(ItemContext);
    const [dirjsonExists, setdirjsonExists] = useState(false);

    useEffect(() => {
      fetch('/api/checkdirectory/upload/json')
      .then(response => response.json())
      .then(data => {
        setdirjsonExists(data);
      });
    }, []);

    if (dirjsonExists) {
      return(
            <div className="rubricBoxContainer">
              <div className='rubricBox'>
                <h3>Available Categories</h3>
                {Hierarchy.map((item, i) =>
                <div key={i}>{item.returnHTML()}</div>)}
              </div>
              {/* Export button */}
              <CSVLink 
                data={totalItems}
                filename={"Export_Results.csv"}
                className='csvLink'>
                Export
              </CSVLink>
            </div>
      )
    } else {
      return(
        <div></div>
      );
    }
}
