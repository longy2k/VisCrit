import React from "react";
import * as markerjs2 from "markerjs2";
import TestImg from "../assets/images/dashboard.png";

export default function Marker() {
  const imgRef = React.useRef(null);
  const showMarkerArea = () => {
    if (imgRef.current !== null) {
      const img = imgRef.current;
      const markerArea = new markerjs2.MarkerArea(img);
      configureMarkerStyles(markerArea);
      markerArea.addEventListener("render", (event) => {
        if (img) {
          img.src = event.dataUrl;
        }
      });
      markerArea.show();
    }
  };
  {/*
  return (
    <div>
      <img
        ref={imgRef}
        src={TestImg}
        alt="test"
        style={{ maxWidth: "100%"}}
        onClick={showMarkerArea}
      />
      <br/>
      <br/>

    </div>
  )*/}
}

function configureMarkerStyles(markerArea) {
  markerArea.uiStyleSettings.toolbarStyleColorsClassName = "bg-black";
  markerArea.uiStyleSettings.toolbarButtonStyleColorsClassName =
    "bg-gradient-to-t from-white to-white hover:from-white hover:to-black-50 fill-current text-black-300";
  markerArea.uiStyleSettings.toolbarActiveButtonStyleColorsClassName =
    "bg-gradient-to-t from-blue-100 via-white to-white fill-current text-black-400";
  markerArea.uiStyleSettings.toolbarOverflowBlockStyleColorsClassName =
    "bg-black";
  markerArea.uiStyleSettings.toolboxColor = "#F472B6";
  markerArea.uiStyleSettings.toolboxAccentColor = "#BE185D";
  markerArea.uiStyleSettings.toolboxStyleColorsClassName = "bg-black";
  markerArea.uiStyleSettings.toolboxButtonRowStyleColorsClassName = "bg-black";
  markerArea.uiStyleSettings.toolboxPanelRowStyleColorsClassName =
    "bg-black-100 bg-opacity-90 fill-current text-black-400";
  markerArea.uiStyleSettings.toolboxButtonStyleColorsClassName =
    "bg-gradient-to-t from-white to-white hover:from-white hover:to-black-50 fill-current text-blue-300";
  markerArea.uiStyleSettings.toolboxActiveButtonStyleColorsClassName =
    "bg-gradient-to-b from-blue-100 to-white fill-current text-red-400";
}
