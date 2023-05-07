import React, { useState, useEffect, useContext, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ItemContext } from './ItemContext';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set the worker URL to the version bundled with react-pdf.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DocumentReader() {
  const [data, setData] = useState({});
  const [numPages, setNumPages] = useState(null);
  const { pageNumber, setPageNumber,  rectangles, setRectangles, accessCanvas} = useContext(ItemContext);
  const [refresh, setRefresh] = useState(accessCanvas);
  const [dirpdfExists, setpdfjsonExists] = useState(false);

  useEffect(() => {
    fetch('/api/checkdirectory/upload/pdf')
    .then(response => response.json())
    .then(data => {
      setpdfjsonExists(data);
    });
  }, []);

  // create an array that has same data as rectangles, but formatted enough for download
  let copyOfRectangles = rectangles;

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  function onRenderSuccess() {
    if (rectangles !== []) {
      const canvases = document.querySelectorAll('.react-pdf__Page canvas');
      canvases.forEach((canvas) => {
        if (!canvas.classList.contains('react-pdf__Page__canvas')) {
          canvas.parentNode.removeChild(canvas);
        }
      });
    }
    const reactPdfPage = document.querySelector('.react-pdf__Page');
    let canvas = document.createElement('canvas');

    let canvasWidth = reactPdfPage.offsetWidth;
    let canvasHeight = reactPdfPage.scrollHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    reactPdfPage.appendChild(canvas);
    const context = canvas.getContext('2d');
    let isDrawing = false;
    let startX, startY;

    rectangles.forEach(rectangle => {
      context.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
    }); // Draw all the saved rectangles

    copyOfRectangles
      .forEach(rectangle => {
        context.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
      });

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
        context.clearRect(0,0, canvas.width, canvas.height);
        const width = event.clientX - adjustmentX - startX;
        const height = event.clientY - adjustmentY - startY;

        rectangles.forEach(rectangle => {
          context.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
        }); // Draw all the saved rectangles

        copyOfRectangles.forEach(rectangle => {
          context.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
        });

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
      })

      // cannot use "rectangles" array, if it is formatted, then some of other functionalities stop working
      // such as hovering over a rating and seeing a rectangle's location
      copyOfRectangles
        .push([
          "startX: " + startX,
          "startY: " + startY,
          "width: " + (event.clientX - canvas.getBoundingClientRect().left - window.pageXOffset - startX),
          "height: " + (event.clientY - canvas.getBoundingClientRect().top - window.pageYOffset - startY)
        ]);

      console.log(rectangles)
      console.log(copyOfRectangles)

    });

    if (accessCanvas === false) {
      clearCanvas();
    }
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
    const canvases = document.querySelectorAll('.react-pdf__Page canvas');

    canvases.forEach((canvas) => {
      if (!canvas.classList.contains('react-pdf__Page__canvas')) {
        canvas.parentNode.removeChild(canvas);
      }
    });

    setPageNumber(pageNumber - 1);
  }

  const handleNextPage = () => {
    const canvases = document.querySelectorAll('.react-pdf__Page canvas');

    canvases.forEach((canvas) => {
      if (!canvas.classList.contains('react-pdf__Page__canvas')) {
        canvas.parentNode.removeChild(canvas);
      }
    });
    setPageNumber(pageNumber + 1);
  }


  function clearCanvas() {
    const canvases = document.querySelectorAll('.react-pdf__Page canvas');
    canvases.forEach((canvas) => {
      if (!canvas.classList.contains('react-pdf__Page__canvas')) {
        canvas.parentNode.removeChild(canvas);
      }
    });
    setRectangles([]);
  }

  function refreshDoc() {
    if (refresh !== accessCanvas) {
      onRenderSuccess();
      setRefresh(accessCanvas);
    }
  }

  if(dirpdfExists){
    return (
      <div className='docView'>
        <div className="fileView" >
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
          )} {refreshDoc()}
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }

}