import React, { useState, useEffect } from "react";

const DisplayPDF = () => {
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("pdfFile");
    setPdfData(data);
  }, []);

  return (
    <div>
      {pdfData ? (
        <iframe src={`data:application/pdf;base64,${pdfData}`} width="100%" height="600"></iframe>
      ) : (
        <div>No PDF data found in session storage</div>
      )}
    </div>
  );
};

export default DisplayPDF;
