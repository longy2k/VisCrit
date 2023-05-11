import React, {useContext, useState} from 'react';
import { ItemContext } from './ItemContext';
import Item from './Item';
import ExportItem from './ExportItem';

export default function CritiqueBox(){
    const [comment, setComment] = useState("");
    let {currentItem, setAccessCanvas, index, setIndex, rectangles, pageNumber, locked, critiquerID, totalItems, setItem} = useContext(ItemContext);
    
    function RemoveComment(){
        if(index === -1){
            setItem(null);
        } else if(locked){
            alert("Please unlock item before deleting");
        }
            else {
            const confirmed = window.confirm('Are you sure you want to delete comment?');
            if(confirmed){
            currentItem.setComment("", index);
            setItem(null);
            }
        }
      }

    const handleCommentChange = event => {
        setComment(event.target.value)
      }
      
    function saveReturn(savedComment) {
        currentItem.LocationRt[index]=[]
        currentItem.critiquerID = critiquerID;
        if(index != -1){
            currentItem.LocationRt[index].push(pageNumber);
            currentItem.LocationRt[index].push(rectangles);
            currentItem.setComment(savedComment, index);
            totalItems.push(new ExportItem(currentItem, index));
        }
        setAccessCanvas(false);
        setItem(null);
        console.log(totalItems);
    }

    function IndexClick(num = -1){
        setIndex(num);
        setComment(currentItem.Comment[num]);
    }

    if (currentItem instanceof Item) {
        return (
            <div className='critiqueBoxContainer' >
                <div className="critiqueBox">
                    <div style={{margin: '0', width: "20vw"}}>
                        <h4> Rating: </h4>
                        <div style={{display: 'flex'}}>
                            <button  id="one" onClick={() => {IndexClick(0)}}>1</button>
                            <button  id="two" onClick={() => {IndexClick(1)}}>2</button>
                            <button  id="three" onClick={() => {IndexClick(2)}}>3</button>
                            <button  id="four" onClick={() => {IndexClick(3)}}>4</button>
                            <button  id="five" onClick={() => {IndexClick(4)}}>5</button>
                            <button style={{margin: '-3px 13px'}} className="generalButton" onClick={() => {setAccessCanvas(true)}}>Location</button>
                        </div>
                    </div>
                    <textarea id="commentArea" type="text" value={comment} onChange={handleCommentChange} style={{margin: '10px 0'}}/>
                    <span style={{ float: 'right', margin: '0px -2px 5px 0' }}>
                        <button className="generalButton" style={{ float: 'right', margin: '0 2px' }} onClick={() => { saveReturn(comment) }}>Submit</button>
                        <button className="generalButton" style={{ float: 'right', margin: '0 2px' }} onClick={() => { RemoveComment() }}>Delete</button>
                    </span>
                    <br/>
                </div>
            </div>

        )
    } else {
    return (
        <div className="critiqueBox" >
        </div>
    )}
}