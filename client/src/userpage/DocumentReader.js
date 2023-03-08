import DocumentFile from "../assets/pdf/Northwestern.pdf"
import CommentB from './CritiqueBox'
import EditFile from "./EditFile"


export default function DocumentReader(){
    return (
            <div className="fileView">
              <object data={DocumentFile} type="application/pdf" width="100%" height="100%"></object>
              <CommentB />
            </div>
    )
}
