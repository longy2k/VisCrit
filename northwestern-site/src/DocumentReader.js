import DocumentFile from "./tutorial_test.pdf"

export default function DocumentReader(){
    return (
        <div className="component">
            <object data={DocumentFile} type="application/pdf" width="100%" height="100%">
            </object>
        </div>
    )
}