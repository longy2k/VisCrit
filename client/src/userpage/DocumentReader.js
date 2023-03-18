import React, { useState, useEffect } from 'react';
import CommentB from './CritiqueBox';
import AnnotateScript from "./AnnotateScript";

export default function DocumentReader() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api/upload/img')
      .then(response => response.json())
      .then(data => {
        console.log(data.path);
        setData(data);
      });
  }, []);

  return (
    <div className="fileView">
    {/* {data.path && <embed src={`http://localhost:5000/${data.path}`}
      type="application/pdf" width="100%" height="100%" />} */}
      <CommentB />
    </div>
  );
}
