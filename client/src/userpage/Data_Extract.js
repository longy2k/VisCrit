import React, {useState} from "react"

import Hierarchy from "./Dropdown_Gen"

export default function Data_Extractor(jsonData=[]){
    const Hierarchies= [];
    const HierarchyMap = new Map();
    let index = -1;
    for(let data in jsonData){
        if(HierarchyMap.has(jsonData[data].CatLevel01)){
            HierarchyMap.get(jsonData[data].CatLevel01).addItem(jsonData[data]);
        }
        else{
            index+=1; 
            HierarchyMap.set(jsonData[data].CatLevel01, new Hierarchy(jsonData[data], false));
            Hierarchies.push(HierarchyMap.get(jsonData[data].CatLevel01));
        }
    }

    return Hierarchies;
}
