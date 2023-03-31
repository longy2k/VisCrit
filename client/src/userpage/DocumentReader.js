import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import CommentB from './CritiqueBox';
import AnnotateScript from "./AnnotateScript";

// Set the worker URL to the version bundled with react-pdf.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DocumentReader() {
  const [data, setData] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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

  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  }

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  }

  return (
    <div className='docView'>
      <div className="fileView">
        {data.path && (
          <>
            <Document
              file={`http://localhost:5000/${data.path}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div className="pageNavigation">
              <button disabled={pageNumber <= 1} onClick={handlePreviousPage}>LEFT</button>
              <button disabled={pageNumber >= numPages} onClick={handleNextPage}>RIGHT</button>
            </div>
          </>
        )}
      </div>
      <CommentB/>
    </div>
  );
}
