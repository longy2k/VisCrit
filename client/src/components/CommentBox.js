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
        <div>
        <form> 
            <div>
            <label>Comment</label>
            <textarea type="text" value={comment} onChange={handleCommentChange}/>
            </div>
        </form>
        </div>
    )
}

export default CommentBox