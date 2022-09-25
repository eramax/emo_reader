import PdfReader from "../core/pdf_helper";
import "pdfjs-dist/web/pdf_viewer.css";
import { useEffect, useRef } from "react";


const PdfView = ({ path }) => {
  let reader;
  let container = useRef();

  const renderPDF = async () => {
    reader = new PdfReader("viewerContainer", path, 1.5, 1, []);
    await reader.render();
  }
  useEffect(() => {
    renderPDF().catch(console.error);
  }, [path])

  return (
    <div className="flex-[1] overflow-y-auto self-stretch flex p-[10px] box-border items-start justify-start text-center text-lg text-black font-inter">
      <div className="w-full" id="viewerContainer">
        <div id="viewer" className="pdfViewer" />
      </div>
    </div>
  );
};

export default PdfView;
