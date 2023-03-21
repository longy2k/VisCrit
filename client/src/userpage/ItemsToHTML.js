import React, {useContext} from "react";
import { ItemContext } from "./ItemContext";

export default function ItemsToHTML(itemList=[]){
    const {setItem} = useContext(ItemContext);
    return (
        itemList.map((item, i) =>
        <ul>
          <li>
            {item.Display}<button className="checkBox" onClick={() => {setItem(item)}}>+</button>
          </li>
        {commentResults(item.LikertValue)}
        </ul>)
      )
}

function commentResults(likeRating=[]){
  return(
    <div>
      {likeRating[0]==="" ? null: buttonGen()}
      {likeRating[1]==="" ? null: buttonGen()}
      {likeRating[2]==="" ? null: buttonGen()}
      {likeRating[3]==="" ? null: buttonGen()}
      {likeRating[4]==="" ? null: buttonGen()}
    </div>
  )
}

function buttonGen(){
  return(
    <button>_</button>
  )
}