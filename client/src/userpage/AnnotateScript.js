import React, { useState, useEffect, useRef } from 'react';
import { Annotorious } from "@recogito/annotorious";
import "@recogito/annotorious/dist/annotorious.min.css";
import CommentB from './CritiqueBox';
import SelectorPack from "@recogito/annotorious-selector-pack";
import Rectangle from "../assets/images/rectangle_icon.png";
import Circle from "../assets/images/circle_icon.png";
import Dot from "../assets/images/dot_icon.png";

function AnnotateScript() {

  const [selectedFile] = useState(null);
  const anno = useState(null);
  const imgRef = useRef(null);


  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api/upload/img')
      .then(response => response.json())
      .then(data => {
        console.log(data.path);
        setData(data);
      });
  }, []);


  useEffect(() => {
    let annotorious = null;
    if (imgRef.current) {
      annotorious = new Annotorious({
        image: imgRef.current,
        widgets: [
          'COMMENT'
        ]
      });

      // event handlers 
      annotorious.on('createAnnotation', annotation => {
        console.log('created', annotation);
      });

      annotorious.on('updateAnnotation', (annotation, previous) => {
        console.log('updated', annotation, previous);
      });

      annotorious.on('deleteAnnotation', annotation => {
        console.log('deleted', annotation);
      });
    }
  }, [selectedFile])

  console.log(anno)

  return (
    <div>
      <div id="my-toolbar-container">
        {/*
        <button onClick={() => anno.setDrawingTool("circle")}>
          <img width={30} src= {Circle} alt="circle" />
        </button>
        <button onClick={() => anno.setDrawingTool("point")}>
          <img width={30} src={Dot} alt="point" />
        </button>
        <button onClick={() => anno.setDrawingTool("rect")}>
          <img width={30} src={Rectangle} alt="Rectangle" />
          </button> */}
      </div>

      <img
        ref={imgRef}
        src={`http://localhost:5000/${data.path}`}
        alt="get Image to annotate"
        id = "annotatedImg"
      />
    </div>
  );
}

export default AnnotateScript;