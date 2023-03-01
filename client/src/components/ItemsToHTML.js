import React, {useContext} from "react";
import { ItemContext } from "./ItemContext";

export default function ItemsToHTML(itemList=[]){
    const {setItem} = useContext(ItemContext);
    return (
        itemList.map((item, i) => 
        <ul className="content-list" key={i}>
        <li>
            <div>
                {item.Display}                
            </div>
        </li>
        <li><button className="checkBox" onClick={(e) => {setItem(item); console.log(item.LikertValue)}}>+</button> </li>
        <li>Rating TODO</li>
    </ul>))
}