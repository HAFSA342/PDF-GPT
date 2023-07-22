import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const PdfViewer = (props) => {
  const { file } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="flex-column menu-main">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(e) => console.log("e", e)}
        >
          <Page pageNumber={numPages} />
        </Document>
        <div></div>
      </div>
    </div>
  );
};

export default PdfViewer;
