import DocumentFile from "../assets/images/dashboard.png";
import CommentBox from './CritiqueBox'
import {AnnotateScript} from "./AnnotateScript.js"


export default function DocumentReader(){
    return (
            <div className="fileView">
            {/*} <object data={DocumentFile} width="100%" height="100%" 
             ></object> */} 
            <AnnotateScript/>
            <CommentBox/>
         </div>
    
    )
}
