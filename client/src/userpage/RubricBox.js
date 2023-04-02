import React, { useEffect, useState, useContext } from 'react'
import { ItemContext } from "./ItemContext"

function handleExportButtonClick() {
    alert("EXPORTED! (sort of, not really)");
  }

export default function RubricBox(){
    let {Hierarchy} = useContext(ItemContext);

    return(
          <div className="rubricBox">
              <ul className="toolBarMenu">
                  <li><strong>Available Categories</strong></li>
                  <br></br>

              </ul>
              {Hierarchy.map((item, i) =>
              <div key={i}>{item.returnHTML()}</div>)}
              <a href="#"><button className="generalButton" style={{float:"right"}} onClick={handleExportButtonClick}>
                Export
              </button></a>
          </div>
    )
}
