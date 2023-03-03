import React from "react";
import CommentBox from "./CommentBox";

export default function GenCommentSection(item){
    return(
        <div>
        <ul className="category-items">
            <li>
                {item.path}
            </li>
            <li>
                BUTTON
            </li>
            <li>
                RATING
            </li>
        </ul>
        <div>
            <CommentBox thisItem={item}/>
        </div>
        </div>
    )
}