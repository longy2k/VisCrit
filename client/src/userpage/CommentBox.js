import React, {useState, useContext} from 'react';
import { ItemContext } from './ItemContext';
function CommentBox(){
    const [comment, setComment] = useState("");
    let {setItem, currentItem, index, accessCanvas} = useContext(ItemContext);
    const handleCommentChange = event => {
        setComment(event.target.value)
    }

    function saveReturn(savedComment){
        if(index != -1){
            currentItem.setComment(savedComment,index);
        }
        setItem(null);
        console.log(currentItem);
    }

    return (
        <div className="commentBox">
          <form id="commentForm">
              <p>Comments ({currentItem.path})</p>
              <textarea id="commentArea" type="text" value={comment} onChange={handleCommentChange}/>
          </form>
          <div className="generalButtonBox">
            <button className="generalButton" style={{'visibility':`${ accessCanvas ?  'hidden':'visible'}` }} onClick={() => {saveReturn(comment)}}>Submit</button>
          </div>
        </div>
    )
}

export default CommentBox
