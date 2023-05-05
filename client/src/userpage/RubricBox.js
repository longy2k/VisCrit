import React, { useEffect, useState, useContext, useRef } from 'react'
import { ItemContext } from "./ItemContext"
import { CSVLink } from "react-csv";
import CritiqueBox from './CritiqueBox';
import Draggable from 'react-draggable';

export default function RubricBox() {
  let {totalItems, Hierarchy} = useContext(ItemContext);
  const [dirjsonExists, setdirjsonExists] = useState(false);
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    fetch('/api/checkdirectory/upload/json')
    .then(response => response.json())
    .then(data => {
      setdirjsonExists(data);
    });
  }, []);

  if (dirjsonExists) {
    return (
      <Draggable>
      <div className="rubricBoxContainer">
        <button
          onClick={() =>
            isOpen ? (setOpen(false), setTransitioning(true)) : setOpen(true)
          }
        >
          Toggle
        </button>
        <div
          className='rubricBox'
          ref={ref}
          style={{ height: isOpen ? ref.current.scrollHeight : 0 }}
          onTransitionEnd={e =>
            ref.current === e.target && setTransitioning(false)
          }
        >
          {isOpen || isTransitioning ? (
            <>
              <h3>Available Categories</h3>
              {Hierarchy.map((item, i) => <div key={i}>{item.returnHTML()} <CritiqueBox/> </div>
              )}
            </>
          ) : null}
        </div>

      </div>
      </Draggable>
    );
  } else {
    return (
      <div></div>
    );
  }
}
