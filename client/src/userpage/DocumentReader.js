import React from "react";

import CommentB from './CritiqueBox'
import EditFile from "./EditFile"

export default function DocumentReader() {
  const uploadedFilePath = sessionStorage.getItem("uploadedFilePath");

  return (
    <div className="fileView">
        <object data={uploadedFilePath} type="application/pdf" width="100%" height="100%" />
      <CommentB />
    </div>
  );
}
