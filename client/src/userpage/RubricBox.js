import React, { useEffect, useState, useContext } from 'react'
import { ItemContext } from "./ItemContext"

function handleExportButtonClick() {
    alert("EXPORTED! (sort of, not really)");
  }

export default function RubricBox(){
    let {Hierarchy} = useContext(ItemContext);

    return(
          <div className="rubricBox">
              <h3>Available Categories</h3>
              {Hierarchy.map((item, i) =>
              <div key={i}>{item.returnHTML()}</div>)}
              <a href="#"><button className="generalButton" style={{float:"right"}} onClick={handleExportButtonClick}>
                Export
              </button></a>
          </div>
    )
}
