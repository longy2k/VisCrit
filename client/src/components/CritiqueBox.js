import GenCommentSection from './GenCommentSection';
import React, {useContext} from 'react';
import { ItemContext } from './ItemContext';
import Item from './Item';

export default function CritiqueBox(){
    let {currentItem }= useContext(ItemContext);
    console.log(currentItem)
    if(currentItem instanceof Item){
        return (
            <div className="critiqueSection" >
                <header>Critique Detail Entry</header>
                {GenCommentSection(currentItem)}
            </div>
        )
    } else{
    return (
        <div className="critiqueSection" >
            <header>Critique Detail Entry</header>
        </div>
    )}
}