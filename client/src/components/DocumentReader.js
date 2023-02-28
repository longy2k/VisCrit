import DocumentFile from "./Northwestern.pdf"
import CommentB from './CritiqueBox'
import EditFile from "./EditFile"


export default function DocumentReader(){
    return (
        <div className="component">
            {/*<div className="docVisual">
            <object data={DocumentFile} type="application/pdf" width="100%" height="100%"></object>
    </div> */}
    <EditFile />
    <br/>
    <br/>
            <CommentB />
        </div>
    )
}