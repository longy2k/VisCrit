import DocumentFile from "./Northwestern.pdf"
import CommentB from './CritiqueBox'

export default function DocumentReader(){
    return (
        <div className="component">
            <div className="docVisual">
            <object data={DocumentFile} type="application/pdf" width="100%" height="100%"></object>
            </div>
            <CommentB />
        </div>
    )
}