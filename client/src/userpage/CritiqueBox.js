import GenCommentSection from './GenCommentSection';
import React, {useContext, useState} from 'react';
import { ItemContext } from './ItemContext';
import Item from './Item';

export default function CritiqueBox(){
    let {currentItem }= useContext(ItemContext);
    let [index, setIndex] = useState(-1);

    if(currentItem instanceof Item){
        return (
            <div className="critiqueBox" >
                <button>Location</button> {/*for eventual location*/}
                <button style={{'visibility':`${currentItem.LikertValue[0] === '' ?  'visible' : 'hidden'}` }}id="one" onClick={() => {setIndex(0)}}>1</button>
                <button style={{'visibility':`${currentItem.LikertValue[1] === '' ?  'visible' : 'hidden'}` }}id="two" onClick={() => {setIndex(1)}}>2</button>
                <button style={{'visibility':`${currentItem.LikertValue[2] === '' ?  'visible' : 'hidden'}` }}id="three" onClick={() => {setIndex(2)}}>3</button>
                <button style={{'visibility':`${currentItem.LikertValue[3] === '' ?  'visible' : 'hidden'}` }}id="four" onClick={() => {setIndex(3)}}>4</button>
                <button style={{'visibility':`${currentItem.LikertValue[4] === '' ?  'visible' : 'hidden'}` }}id="five" onClick={() => {setIndex(4)}}>5</button>
                {GenCommentSection(currentItem, index)}
            </div>
        )
    } else{
    return (
        <div className="critiqueBox" >
        </div>
    )}
}
