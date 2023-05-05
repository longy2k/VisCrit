import React, {useContext, useState, useEffect} from 'react';
import { ItemContext } from './ItemContext';
import Item from './Item';
import Draggable from "react-draggable";


export default function CritiqueBox(){
    const [comment, setComment] = useState("");
    let {currentItem: item1, setAccessCanvas: setCanvas1, index: index1, setIndex: setIndex1, rectangles, pageNumber} = useContext(ItemContext);
    let {totalItems, setItem, currentItem: item2, index: index2, accessCanvas: canvas2} = useContext(ItemContext);

    const [MousePosition, setMousePosition] = useState({
        left: 0,
        top: 0
    })
  
    function handleMouseMove(ev) { setMousePosition({left: ev.pageX, top: ev.pageY}); }


    useEffect(() => {
        if (item2 && Array.isArray(item2.Comment) && index2 !== -1) {
          setComment(item2.Comment[index2]);
        }
      }, [index2, item2]);
    

    const handleCommentChange = event => {
        setComment(event.target.value)
      }
      
    function saveReturn(savedComment) {
        item1.LocationRt[index1].push(pageNumber);
        item1.LocationRt[index1].push(rectangles);
        setCanvas1(false);
        if (index2 !== -1){
            item2.setComment(savedComment, index2);
        }
        totalItems.push(item2);
        setItem([...totalItems.slice(0, index2), item2, ...totalItems.slice(index2 + 1)]);
    }

    if (item1 instanceof Item) {
        return (
            <div className='critiqueBoxContainer' onMouseMove={(ev)=> handleMouseMove(ev)} >
                <div className="critiqueBox">
                    <h3 style={{margin: '10px 0'}}>{item1.path}</h3>
                    <div style={{display: 'flex', alignItems: 'center', height:'40px'}}>
                        <h4 style={{marginRight: '5px', marginTop: '0px'}}>Rating: </h4>
                        <div style={{display: 'flex'}}>
                            <button style={{visibility: `${item1.Comment[0] === '' ? 'visible' : 'hidden'}` }} id="one" onClick={() => {setIndex1(0)}}>1</button>
                            <button style={{visibility: `${item1.Comment[1] === '' ? 'visible' : 'hidden'}` }} id="two" onClick={() => {setIndex1(1)}}>2</button>
                            <button style={{visibility: `${item1.Comment[2] === '' ? 'visible' : 'hidden'}` }} id="three" onClick={() => {setIndex1(2)}}>3</button>
                            <button style={{visibility: `${item1.Comment[3] === '' ? 'visible' : 'hidden'}` }} id="four" onClick={() => {setIndex1(3)}}>4</button>
                            <button style={{visibility: `${item1.Comment[4] === '' ? 'visible' : 'hidden'}` }} id="five" onClick={() => {setIndex1(4)}}>5</button>
                            <button style={{visibility: `${index1 === -1 ? 'hidden' : 'visible'}`, margin: '-3px 10px'}} className="generalButton" onClick={() => {setCanvas1(true)}}>Location</button>
                        </div>
                    </div>
                    <textarea id="commentArea" type="text" value={comment} onChange={handleCommentChange} style={{margin: '10px 0'}}/>
                    <span style={{ float: 'right', margin: '5px 0' }}>
                        <button className="generalButton"  onClick={() => { saveReturn(comment) }}>Submit</button>
                    </span>
                </div>
            </div>

        )
    } else {
    return (
        <div className="critiqueBox" >
        </div>
    )}
}