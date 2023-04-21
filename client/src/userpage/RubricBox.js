import React, { useEffect, useState, useContext } from 'react'
import { ItemContext } from "./ItemContext"
import FileSaver from "file-saver"
import * as XLSX from 'xlsx';


export default function RubricBox(){
    let {Hierarchy, totalItems} = useContext(ItemContext);
    
    function handleExportButtonClick()  {
    
      var ws = XLSX.utils.json_to_sheet(totalItems);
  
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "sheet1");
  

      let arrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

      // Binary string
      XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  
      console.log(wb)
  
         XLSX.writeFile(wb, "studentsData.xlsx");
    }

    
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
