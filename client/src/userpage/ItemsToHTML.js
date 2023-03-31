import React, {useContext} from "react";
import { ItemContext } from "./ItemContext";

export default function ItemsToHTML(itemList=[]){
    const {currentItem, setItem} = useContext(ItemContext);

    function CommentResults(item=[]){
      return(
        <div>
          {ButtonGen(0,item)}
          {ButtonGen(1,item)}
          {ButtonGen(2,item)}
          {ButtonGen(3,item)}
          {ButtonGen(4,item)}
        </div>
      )
    }

    function RemoveComment(item, num){
      item.setComment("", num);
      /* force re-render by setting Item to something*/
      if(currentItem === null){
        setItem([]);
      } else {
        setItem(null);
      }
    }

    function ButtonGen(num=0, item=[]){
      return(
        <div style={{'visibility':`${item.LikertValue[num] === '' ?  'hidden':'visible'}` }} className="tooltip">
          <span className="tooltiptext">{item.LikertValue[num]}</span>
          <button onClick={()=>{RemoveComment(item,num)}}>{num+1}</button>
        </div>
      )
    }

    return (
        itemList.map((item, i) =>
        <ul>
          <li>
            <div className="tooltip">
              <span className="tooltiptext">{item.mouseOver}</span>
              {item.Display}
            </div>
              <button className="checkBox" onClick={() => {setItem(item)}}>+</button>
            
          </li>
          {CommentResults(item)}
        </ul>)
      )
}



