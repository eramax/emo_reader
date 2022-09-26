import React, {  useRef } from "react";
import usePdf from "./usePdf";


const PdfView = ({ url }) => {
  let viewer = useRef();
  let textDiv = useRef();
  let mainCanvas = useRef();
  const [pageNo, pageCount, nextPage, prevPage, scale, autoscale, zoomIn, zoomOut] = usePdf(url, viewer,mainCanvas,textDiv);



  return (
    <div className="flex-[1] overflow-y-auto w-full h-screen flex justify-center items-center">
      <button onClick={nextPage}>next</button>
      <div className="w-full h-full relative z-0" ref={viewer}>
        <canvas ref={mainCanvas}></canvas>
        <div className="absolute inset-0 z-10 textLayer" ref={textDiv}></div>
      </div>
    </div>
  );
};

export default PdfView;
