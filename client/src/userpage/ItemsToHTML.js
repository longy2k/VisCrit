import React, {useContext} from "react";
import { ItemContext } from "./ItemContext";

export default function ItemsToHTML(itemList=[]){
    const {setItem} = useContext(ItemContext);
    return (
        itemList.map((item, i) =>
        <ul>
          <li>
            {item.Display}
          </li>
        <li><button className="checkBox" onClick={(e) => {setItem(item)}}>+</button> </li>
        <li>Rating TODO</li>
        </ul>)
      )
}
