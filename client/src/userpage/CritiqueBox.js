import React, {useContext, useState} from 'react';
import { ItemContext } from './ItemContext';
import Item from './Item';

export default function CritiqueBox(){
    const [comment, setComment] = useState("");
    let {totalItems, setItem, currentItem, index, setIndex, setAccessCanvas, accessCanvas} = useContext(ItemContext);

    const handleCommentChange = event => {
        setComment(event.target.value)
    }

    function saveReturn(savedComment){
        if(index != -1){
            currentItem.setComment(savedComment,index);
        }
        totalItems.push(currentItem);
        console.log(totalItems);
        setItem(null);
    }

    if(currentItem instanceof Item){
        return (
            <div className="critiqueBox">
                <h4>{currentItem.path}</h4>
                <button style={{'visibility':`${currentItem.Comment[0] === '' ?  'visible' : 'hidden'}` }}id="one" onClick={() => {setIndex(0)}}>1</button>
                <button style={{'visibility':`${currentItem.Comment[1] === '' ?  'visible' : 'hidden'}` }}id="two" onClick={() => {setIndex(1)}}>2</button>
                <button style={{'visibility':`${currentItem.Comment[2] === '' ?  'visible' : 'hidden'}` }}id="three" onClick={() => {setIndex(2)}}>3</button>
                <button style={{'visibility':`${currentItem.Comment[3] === '' ?  'visible' : 'hidden'}` }}id="four" onClick={() => {setIndex(3)}}>4</button>
                <button style={{'visibility':`${currentItem.Comment[4] === '' ?  'visible' : 'hidden'}` }}id="five" onClick={() => {setIndex(4)}}>5</button>
                <button style={{visibility: `${index === -1 ? 'hidden' : 'visible'}`, margin: '0 10px'}} className="generalButton" onClick={() => {setAccessCanvas(true)}}>Location</button>
                <textarea id="commentArea" type="text" value={comment} onChange={handleCommentChange}/>
                <span style={{float: 'right', margin: '10px 0'}}>
                    <button className="generalButton" style={{visibility: `${accessCanvas ? 'hidden' : 'visible'}`}} onClick={() => {saveReturn(comment)}}>Submit</button>
                </span>
            </div>
        )
    } 
}
