import React, {useContext} from "react"
import { ItemContext } from "./ItemContext"

export default function RubricBox(){
    let {Hierarchy} = useContext(ItemContext)

    return(
          <div className="rubricBox">
              <ul className="toolBarMenu">
                  <li><strong>Available Categories</strong></li>
              </ul>
              {Hierarchy.map((item, i) =>
              <div key={i}>{item.returnHTML()}</div>)}
              {/*<div>
                  <button onClick={(e) => {console.log(Hierarchy)}}>Test</button>
              </div>*/}
          </div>
    )
}
