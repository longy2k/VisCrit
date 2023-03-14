import React, { useEffect, useState, useContext } from 'react'
import { ItemContext } from "./ItemContext"

export default function RubricBox(){
    let {Hierarchy} = useContext(ItemContext)
    const [data, setData] = useState({});

    useEffect(() => {
      fetch('/api/upload/json')
        .then(response => response.json())
        .then(data => {
          console.log(data.path);
          setData(data);
        });
    }, []);

    return(
          <div className="rubricBox">
              <ul className="toolBarMenu">
                  <li><strong>Available Categories</strong></li>
              </ul>
              {Hierarchy.map((item, i) =>
              <div key={i}>{item.returnHTML()}</div>)}
          </div>
    )
}
