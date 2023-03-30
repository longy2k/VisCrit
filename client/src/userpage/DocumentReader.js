import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import CommentB from './CritiqueBox';
import AnnotateScript from "./AnnotateScript";

// Set the worker URL to the version bundled with react-pdf.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DocumentReader() {
  const [data, setData] = useState({});
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  useEffect(() => {
    fetch('/api/upload/pdf')
      .then(response => response.json())
      .then(data => {
        console.log(data.path);
        setData(data);
      });
  }, []);

  return (
    <div className='docView'>
      <div className="fileView">
        {data.path && (
          <Document
            file={`http://localhost:5000/${data.path}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        )}
      </div>
      <CommentB/>
    </div>
  );
}
