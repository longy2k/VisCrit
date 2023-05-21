import React, { useState, useEffect, useContext, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ItemContext } from "./ItemContext";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DocumentReader() {
  const [data, setData] = useState({});
  const {pageNumber, setPageNumber, rectangles, 
        numPages, setNumPages, setRectangles, accessCanvas} = useContext(ItemContext);
  const [refresh, setRefresh] = useState(accessCanvas);
  const [dirpdfExists, setpdfjsonExists] = useState(false);
  const serverUrl = "https://viscritbackend.onrender.com";

  useEffect(() => {
    // Check if the directory for PDF files exists
    fetch(serverUrl + "/api/checkdirectory/upload/pdf")
      .then((response) => response.json())
      .then((data) => {
        setpdfjsonExists(data);
      });
  }, []);

  // Create a copy of the rectangles array for formatting in exported results
  let copyOfRectangles = rectangles;
  let location = rectangles;

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  function onRenderSuccess() {
    // Remove any additional canvases from previous renderings
    if (rectangles !== []) {
      const canvases = document.querySelectorAll(".react-pdf__Page canvas");
      canvases.forEach((canvas) => {
        if (!canvas.classList.contains("react-pdf__Page__canvas")) {
          canvas.parentNode.removeChild(canvas);
        }
      });
    }

    // Creating canvas layered on top of page
    const reactPdfPage = document.querySelector(".react-pdf__Page");
    let canvas = document.createElement("canvas");
    let canvasWidth = reactPdfPage.offsetWidth;
    let canvasHeight = reactPdfPage.scrollHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    reactPdfPage.appendChild(canvas);
    const context = canvas.getContext("2d");
    let isDrawing = false;
    let startX, startY;

    // Draw all the saved rectangles-- shows when rating is hovered
    rectangles.forEach((rectangle) => {
      context.fillStyle = "rgba(0, 0, 255, .3)";
      context.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
    });

    copyOfRectangles.forEach((rectangle) => {
      context.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
    });

    canvas.addEventListener("mousedown", (event) => {
      // Handle mouse down event for drawing rectangles
      const rect = canvas.getBoundingClientRect();
      const adjustmentX = rect.left + window.pageXOffset;
      const adjustmentY = rect.top + window.pageYOffset;
      startX = event.clientX - adjustmentX;
      startY = event.clientY - adjustmentY;
      isDrawing = true;
    });

    // Handle mouse move event for drawing rectangles
    canvas.addEventListener("mousemove", (event) => {
      if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const adjustmentX = rect.left + window.pageXOffset;
        const adjustmentY = rect.top + window.pageYOffset;
        context.clearRect(0, 0, canvas.width, canvas.height);
        const width = event.clientX - adjustmentX - startX;
        const height = event.clientY - adjustmentY - startY;
        
        // Draw all the saved rectangles
        rectangles.forEach((rectangle) => {
          context.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
        }); 

        copyOfRectangles.forEach((rectangle) => {
          context.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
        });

        // Highlight color
        context.fillStyle = "#0000FF";
        context.fillRect(startX, startY, width, height);
      }
    });

    // Handle click event to save the coordinates of a click on the canvas
    canvas.addEventListener("click", function (event) {
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      location.push(["Coordinates: " + "X: " + x, "Y: " + y]);
    });

    // Handle mouseup event to save the current rectangle, saves as an object array
    canvas.addEventListener("mouseup", (event) => {
      isDrawing = false;
      // Save the current rectangle to the array
      rectangles.push({
        startX: startX,
        startY: startY,
        width: event.clientX - canvas.getBoundingClientRect().left - window.pageXOffset - startX,
        height: event.clientY - canvas.getBoundingClientRect().top - window.pageYOffset - startY
      });

      // Copy the rectangles array, formatting the object array to show its contents
      copyOfRectangles.push([
        "Size: " +
        "startX: " + startX,
        "startY: " + startY,
        "width: " + (event.clientX - canvas.getBoundingClientRect().left - window.pageXOffset - startX),
        "height: " + (event.clientY - canvas.getBoundingClientRect().top - window.pageYOffset - startY)
      ]);
    });


    if (accessCanvas === false) {
      clearCanvas();
    }
  }

  useEffect(() => {
    // Fetch PDF data from the server
    fetch(serverUrl + "/api/upload/pdf")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.path);
        setData(data);
      });
  }, []);

  // Handle page navigation for the file and the canvas
  const handlePreviousPage = () => {
    const canvases = document.querySelectorAll(".react-pdf__Page canvas");
    canvases.forEach((canvas) => {
      if (!canvas.classList.contains("react-pdf__Page__canvas")) {
        canvas.parentNode.removeChild(canvas);
      }
    });
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    const canvases = document.querySelectorAll(".react-pdf__Page canvas");
    canvases.forEach((canvas) => {
      if (!canvas.classList.contains("react-pdf__Page__canvas")) {
        canvas.parentNode.removeChild(canvas);
      }
    });
    setPageNumber(pageNumber + 1);
  };

  function clearCanvas() {
    const canvases = document.querySelectorAll(".react-pdf__Page canvas");
    canvases.forEach((canvas) => {
      if (!canvas.classList.contains("react-pdf__Page__canvas")) {
        canvas.parentNode.removeChild(canvas);
      }
    });
    setRectangles([]);
  }

  function refreshDoc() {
    // Refresh the document if the accessCanvas prop changes
    if (refresh !== accessCanvas) {
      onRenderSuccess();
      setRefresh(accessCanvas);
    }
  }

  if (dirpdfExists) {
    return (
      <div className="docView">
        <div className="fileView">
          {data.path && (
            <>
              <Document
                file={`${serverUrl}/${data.path}`}
                renderMode="canvas">
                <Page pageNumber={pageNumber} onRenderSuccess={onRenderSuccess} scale={5}/>
              </Document>
            </>
          )}
          {refreshDoc()}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
