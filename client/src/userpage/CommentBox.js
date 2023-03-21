import React, {useState, useContext} from 'react';
import { ItemContext } from './ItemContext';
function CommentBox({thisItem}){

    const [comment, setComment] = useState(thisItem.LikertValue[0]);
    let {Hierarchy, setItem} = useContext(ItemContext);
    const handleCommentChange = event => {
        setComment(event.target.value)
    }

    function saveReturn(savedComment){
        let location = thisItem.itemLocation;
        thisItem.setComment(savedComment);
        if(location.length === 2){
            Hierarchy[location[0]].itemList[location[1]] = thisItem;
        } else if(location.length === 3){
            let subHierarchyName = Hierarchy[location[0]].subHierNames[location[1]];
            Hierarchy[location[0]].subHierList.get(subHierarchyName)[location[2]] = thisItem;
        }
        setItem(null);
    }

    return (
        <div className="commentBox">
          <form id="commentForm">
              <p>Comments ({thisItem.path})</p>
              <textarea id="commentArea" type="text" value={comment} onChange={handleCommentChange}/>
          </form>
          <div>
            <button onClick={() => {saveReturn(comment)}}>Submit</button>
            <button onClick={() => {setItem(null)}}>Cancel</button>
          </div>
        </div>
    )
}

export default CommentBox
