import React, {useState} from "react"
import DocReader from "./DocumentReader"
import Rubric from "./RubricBox"
import { ItemContext } from "./ItemContext";

export default function MainBody() {
    const [currentItem, setItem] = useState({});

    return (
        <div className="mainBody" onClick={() => {console.log(window.currentItem)}}>
            <ItemContext.Provider value={{currentItem, setItem}}>
                <DocReader />
                <Rubric  />
            </ItemContext.Provider>
        </div>
    )
}
