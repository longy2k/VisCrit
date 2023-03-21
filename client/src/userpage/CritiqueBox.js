import GenCommentSection from './GenCommentSection';
import React, {useContext} from 'react';
import { ItemContext } from './ItemContext';
import Item from './Item';

export default function CritiqueBox(){
    let {currentItem }= useContext(ItemContext);
    if(currentItem instanceof Item){
        return (
            <div className="critiqueBox" >
                <button>Location</button> {/*for eventual location*/}
                <button>_</button> {/*there will be 5 of these buttons which corresponds with the LikeRT in items*/}
                {GenCommentSection(currentItem)}
            </div>
        )
    } else{
    return (
        <div className="critiqueBox" >
        </div>
    )}
}
