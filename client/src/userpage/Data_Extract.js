import React, {useState} from "react"

import Hierarchy from "./Dropdown_Gen"

export default function Data_Extractor(jsonData=[]){
    const Hierarchies= [];
    const HierarchyMap = new Map();

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

    return Hierarchies;
}
