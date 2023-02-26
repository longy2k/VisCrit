import React, {useState} from "react"
import XLSX from "xlsx"
import Hierarchy from "./Dropdown_Gen"

export default function RubricBox(){
    const[jsonData, setData] = useState([]);
    const handleFile = async(e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[3]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1, blankrows:false})
        setData(jsonData)
    }
    
    const Hierarchies= [];
    const HierarchyMap = new Map();
    console.log(jsonData);
    for(let data in jsonData){
        if(data == 0){
            continue;
        }
        if(HierarchyMap.has(jsonData[data][2])){
            HierarchyMap.get(jsonData[data][2]).addItem(jsonData[data]);
        }
        else{
            HierarchyMap.set(jsonData[data][2], new Hierarchy(jsonData[data], false));
            Hierarchies.push(HierarchyMap.get(jsonData[data][2]));
        }
    }
    console.log(Hierarchies) 
    console.log(HierarchyMap.size) 

    return(
        <div className="component">
            <ul className="category-items">
                <li>Available Categories</li>
                <li>Comment</li>
                <li>Location</li>
            </ul>
            <input type="file" onChange={(e) => handleFile(e)}/>
            {Hierarchies.map((item, i) => 
            <div key={i}>{item.returnHTML()}</div>)}
        </div>
    )
}
