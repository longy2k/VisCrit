import React from "react"
import DocReader from "./DocumentReader"
import Rubric from "./RubricBox"

export default function MainBody() {
    return (
        <div className="mainBody">
            <DocReader />
            <Rubric />
        </div>
    )
}