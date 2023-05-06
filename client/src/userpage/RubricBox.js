import React, { useEffect, useState, useContext, useRef } from 'react'
import { ItemContext } from "./ItemContext"
import Draggable from 'react-draggable';

export default function RubricBox() {
  let {totalItems, Hierarchy} = useContext(ItemContext);
  const [dirjsonExists, setdirjsonExists] = useState(false);
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);
  const [isTransitioning, setTransitioning] = useState(false);
  const buttonText = isOpen ? 'Collapse' : 'Show';

  const handleClick = () => {
    if (isOpen) {
      setOpen(false);
      setTransitioning(true);
    } else {
      setOpen(true);
    }
  };

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
      <button className={`generalButton ${isOpen ? 'open' : ''}`} onClick={handleClick}>
      {buttonText}
    </button>
        <div
        className={`rubricBox ${isOpen ? 'open' : ''}`}
        ref={ref}
          style={{ height: isOpen ? ref.current.scrollHeight : "0"}}
          onTransitionEnd={e =>
            ref.current === e.target && setTransitioning(false)
          }
        >
          {isOpen || isTransitioning ? (
            <>
              <h3>Available Categories</h3>
              {Hierarchy.map((item, i) => <div key={i}>{item.returnHTML()}</div>
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