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
  
  let rectangles = []; // declare an empty array to store the rectangles

  function onRenderSuccess() {
    const reactPdfPage = document.querySelector('.react-pdf__Page');
    const canvas = document.createElement('canvas');
  
    const canvasWidth = reactPdfPage.offsetWidth;
    const canvasHeight = reactPdfPage.scrollHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    reactPdfPage.appendChild(canvas);
    const context = canvas.getContext('2d');
    let isDrawing = false;
    let startX, startY;
    let rectangles = []; // An array to store the rectangles
  
    canvas.addEventListener('mousedown', (event) => {
      context.fillStyle = "#0000FF";
  
      const rect = canvas.getBoundingClientRect();
      const adjustmentX = rect.left + window.pageXOffset;
      const adjustmentY = rect.top + window.pageYOffset;
  
      startX = event.clientX - adjustmentX;
      startY = event.clientY - adjustmentY;
      isDrawing = true;
    });
  
    canvas.addEventListener('mousemove', (event) => {
      if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const adjustmentX = rect.left + window.pageXOffset;
        const adjustmentY = rect.top + window.pageYOffset;
  
        const width = event.clientX - adjustmentX - startX;
        const height = event.clientY - adjustmentY - startY;
  
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        rectangles.forEach(rectangle => {
          context.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
        }); // Draw all the saved rectangles
  
        context.fillStyle = "#0000FF";
        context.fillRect(startX, startY, width, height);
  
      }
    });
  
    canvas.addEventListener('mouseup', (event) => {
      isDrawing = false;
  
      // Save the current rectangle to the array
      rectangles.push({
        startX: startX,
        startY: startY,
        width: event.clientX - canvas.getBoundingClientRect().left - window.pageXOffset - startX,
        height: event.clientY - canvas.getBoundingClientRect().top - window.pageYOffset - startY
      });
    });
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
