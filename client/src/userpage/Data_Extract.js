import React from "react";
import Hierarchy from "./Dropdown_Gen"

export default function Data_Extractor(jsonData=[]){
    const Hierarchies= [];
    const HierarchyMap = new Map();
    let index = -1;
    
    // Iterate over the jsonData array
    for (let data in jsonData) {
        // Check if the HierarchyMap already has the category level
        if (HierarchyMap.has(jsonData[data].CatLevel01)) {
            // If it exists, add the current data item to the existing Hierarchy
            HierarchyMap.get(jsonData[data].CatLevel01).addItem(jsonData[data]);
        }
        else {
            // If it doesn't exist, create a new Hierarchy and add it to the HierarchyMap and Hierarchies array
            index += 1; 
            HierarchyMap.set(jsonData[data].CatLevel01, new Hierarchy(jsonData[data], false));
            Hierarchies.push(HierarchyMap.get(jsonData[data].CatLevel01));
        }
    }
    return Hierarchies;
}
