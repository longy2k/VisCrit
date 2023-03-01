import React from "react"
import DocReader from "./DocumentReader"
import Rubric from "./RubricBox"
import EditFile from "./EditFile"

export default function MainBody() {
    return (
        <div className="mainBody">
            <DocReader />
            <Rubric />
        </div>
    )
}