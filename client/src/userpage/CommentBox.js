import React, {useState, useContext} from 'react';
import { ItemContext } from './ItemContext';
function CommentBox({thisItem, index}){
    const [comment, setComment] = useState("");
    let {setItem} = useContext(ItemContext);
    const handleCommentChange = event => {
        setComment(event.target.value)
    }

    function saveReturn(savedComment){
        if(index != -1){
            thisItem.setComment(savedComment,index);
        }
        setItem(null);
    }

    return (
        <div className="commentBox">
          <form id="commentForm">
              <p>Comments ({thisItem.path})</p>
              <textarea id="commentArea" type="text" value={comment} onChange={handleCommentChange}/>
          </form>
          <div className="commentBoxButtons">
            <button className="submitButton" onClick={() => {saveReturn(comment)}}>Submit</button>
            {/* <button className="cancelButton" onClick={() => {setItem(null)}}>Cancel</button> */}
          </div>
        </div>
    )
}

export default CommentBox
