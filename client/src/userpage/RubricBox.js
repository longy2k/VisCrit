import React, { useEffect, useState, useContext } from 'react'
import { ItemContext } from "./ItemContext"
import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";

export default function RubricBox() {
    let {totalItems, Hierarchy} = useContext(ItemContext);

    return(
          <div className="rubricBox">
              <h3>Available Categories</h3>
              {Hierarchy.map((item, i) =>
              <div key={i}>{item.returnHTML()}</div>)}
              {/*<a href="#">
                <button className="generalButton" 
                        style={{float:"right"}} 
                        onClick={handleExportButtonClick}>
                  Export
                </button>
              </a>*/}
              <CSVLink 
                data={totalItems}
                filename={"Export_Results.csv"}
                className='csvLink'>
                Export
              </CSVLink>

          </div>
    )
}
