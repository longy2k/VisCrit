import React, {useContext} from "react"
import { ItemContext } from "./ItemContext"

export default function RubricBox(){
    let {Hierarchy} = useContext(ItemContext)
    return(
        <div className="component">
            <ul className="category-items">
                <li>Available Categories</li>
                <li>Comment</li>
                <li>Location</li>
            </ul>
            {Hierarchy.map((item, i) => 
            <div key={i}>{item.returnHTML()}</div>)}
            <div>
                <button onClick={(e) => {console.log(Hierarchy)}}>Test</button>
            </div>
        </div>
    )
}
