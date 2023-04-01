import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import CommentB from './CritiqueBox';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set the worker URL to the version bundled with react-pdf.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DocumentReader() {
  const [data, setData] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  function onRenderSuccess() {
    const canvas = document.querySelector('.react-pdf__Page__canvas'); // get the canvas element
    const context = canvas.getContext('2d'); // get the canvas context
    let isDrawing = false;
    let startX, startY;
    canvas.addEventListener('mousedown', (event) => {
      isDrawing = true;
      console.log(isDrawing);
      startX = event.offsetX;
      startY = event.offsetY;
    });

    canvas.addEventListener('mousemove', (event) => {
      if (isDrawing) {
        const width = event.offsetX - startX;
        const height = event.offsetY - startY;
        context.fillRect(startX, startY, width, height);
        console.log("YES");
        context.fillStyle = 'blue';
      context.fillRect(startX, startY, width, height);
      }
    });

    canvas.addEventListener('mouseup', (event) => {
      isDrawing = false;
    });
    
    // canvas.addEventListener('click', (event) => {
    //   const x = event.offsetX; // get the x-coordinate of the cursor relative to the canvas
    //   const y = event.offsetY; // get the y-coordinate of the cursor relative to the canvas
    //   const imageData = context.getImageData(50, 600, 100, 50); // get the image data of the original rectangle
    //   context.putImageData(imageData, x, y); // draw the image data at the cursor position
    // });
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
              renderMode="canvas"
            >
              <Page pageNumber={pageNumber} onRenderSuccess={onRenderSuccess} />
            </Document>
          </>
        )}
      </div>
      <div className="pageNavigation">
          <button className="leftButton" disabled={pageNumber <= 1} onClick={handlePreviousPage}>&#8592;</button>
          <button className="rightButton" disabled={pageNumber >= numPages} onClick={handleNextPage}>&#8594;</button>
      </div>
      <CommentB/>
    </div>
  );
}
