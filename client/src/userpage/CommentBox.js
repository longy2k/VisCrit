import React, {useState, useContext} from 'react';
import { ItemContext } from './ItemContext';
function CommentBox({thisItem}){

    const [comment, setComment] = useState(thisItem.LikertValue[0]);
    let {currentItem} = useContext(ItemContext);

    const handleCommentChange = event => {
        setComment(event.target.value)
        thisItem.setComment(comment)
        console.log(currentItem);
    }

    return (
        <div className="commentBox">
          <form id="commentForm">
              <p>Comments ({currentItem.path})</p>
              <textarea id="commentArea" type="text" value={comment} onChange={handleCommentChange}/>
          </form>
        </div>
    )
}

export default CommentBox
