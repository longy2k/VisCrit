import React, { useContext, useState } from "react";
import { ItemContext } from "./ItemContext";
import CritiqueBox from "./CritiqueBox";

export default function ItemsToHTML(itemList = []) {
  const {currentItem, setItem, setPageNumber, setRectangles, setAccessCanvas, setIndex, locked, setLock} = useContext(ItemContext);

  function CommentResults(item = []) {
    return (
      <div id="buttonGen">
        {ButtonGen(4, item, currentItem)}
        {ButtonGen(3, item, currentItem)}
        {ButtonGen(2, item, currentItem)}
        {ButtonGen(1, item, currentItem)}
        {ButtonGen(0, item, currentItem)}
      </div>
    );
  }

  function drawRectangle(arr = []) {
    if (!locked) {
      setAccessCanvas(true);
      setRectangles(arr[1]);
      setPageNumber(arr[0]);
    }
  }

  function clearCanvas() {
    if (!locked) {
      console.log("tried to clear");
      setRectangles([]);
      setAccessCanvas(false);
    }
  }

  function LockView() {
    locked ? setLock(false) : setLock(true);
  }

  function ButtonGen(num = 0, item = [], currentItem) {
    const hideButton = item === currentItem;
    return (
      <div
        style={{
          visibility: `${item.Comment[num] === "" ? "hidden" : "visible"}`,
          display: `${item.Comment[num] === "" || hideButton ? "none" : "inline-flex"}`,
          marginRight: "-53px",
        }}
        onMouseEnter={() => {drawRectangle(item.LocationRt[num]);}}
        onMouseLeave={() => {clearCanvas();}}
        className="tooltip">
          <span className="tooltiptext">{item.Comment[num]}</span>
          {!hideButton && (
          <button
            className="commentRt"
            onClick={() => {LockView(); }}>
            {num + 1}
          </button>
        )}
      </div>
    );
  }

  function AddCommentHandler(item = null) {
    setItem(item);
    item === currentItem ? setItem(null) : setItem(item);
    setIndex(-1);
  }

  return itemList.map((item, i) => (
    <ul>
      <li>
        <div className="alignRatingContainer">
          <div className="tooltip">
            <button className="plus" onClick={() => {AddCommentHandler(item);}}> {item === currentItem ? "-" : "+"} </button>
            {item.Display}
          </div>
          {item === currentItem ? <CritiqueBox /> : null}
        </div>
        {CommentResults(item)}
      </li>
    </ul>
  ));
}
