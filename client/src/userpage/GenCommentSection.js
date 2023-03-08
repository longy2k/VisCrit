import React from "react";
import CommentBox from "./CommentBox";
import CritiqueBox from "./CritiqueBox";

export default function GenCommentSection(item){
    return(
        <div className="GenCommentSection">
        {/*<ul className="category-items">
            <li>
                {item.path}
            </li>
            <li>
                BUTTON
            </li>
            <li>
                RATING
            </li>
        </ul>*/}
        <CommentBox thisItem={item}/>
        </div>
    )
}
