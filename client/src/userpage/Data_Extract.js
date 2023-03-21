import React, {useState} from "react"

import Hierarchy from "./Dropdown_Gen"

export default function Data_Extractor(jsonData=[]){
    const Hierarchies= [];
    const HierarchyMap = new Map();
    let index = -1;
    for(let data in jsonData){
        if(data == 0){
            continue;
        }
        let itemLocation = [];
        if(HierarchyMap.has(jsonData[data][2])){
            itemLocation.push(index);
            HierarchyMap.get(jsonData[data][2]).addItem(jsonData[data]);
        }
        else{
            index+=1; 
            itemLocation.push(index);
            HierarchyMap.set(jsonData[data][2], new Hierarchy(jsonData[data], false, itemLocation));
            Hierarchies.push(HierarchyMap.get(jsonData[data][2]));
        }
    }

    return Hierarchies;
}
