import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Highlight from "../components/Highlight";
import usePdf from "../components/usePdf";
import { data } from "autoprefixer";

const PDFReader = () => {

  const [highlights, setHighlights] = useState([{title: Date.now, body: "hello"}]);
  let viewer = useRef();
  let textDiv = useRef();
  let mainCanvas = useRef();

  let url = "1.pdf";
  const pdf = usePdf(url, viewer, mainCanvas, textDiv);
  const high = () => {console.log("high")}

  const handleMouseUp = () => {
    console.log(window.getSelection().toString());
    setHighlights([{title: data.now, body: window.getSelection().toString() }]);
  }
  return (
    <div className="relative bg-gray-300 w-full h-screen  overflow-y-hidden flex flex-col items-start justify-start text-center text-lg text-gray-600 font-inter">
      <Header pdf={pdf} high={high} />
      <div className="flex-[1] self-stretch flex flex-row items-start justify-start">
        <div className="overflow-y-auto h-screen self-stretch border-t-[0px_solid_#8a85ab] border-r-[1px_solid_#8a85ab] border-b-[0px_solid_#8a85ab] border-l-[0px_solid_#8a85ab] box-border relative w-[471px] shrink-0 flex flex-col p-[20px_0px] items-start justify-start gap-[15px]">
          <b className="self-stretch relative tracking-[0.1em] uppercase inline-block">
            highlights
          </b>
          <div className="flex-[1] self-stretch flex flex-col items-start justify-start gap-[10px]">
            {highlights.map(hgh => <Highlight key={hgh.title} title={hgh.title} body={hgh.body} />)}
          </div>
        </div>
        <div className="flex-[1] overflow-y-auto w-full h-screen flex justify-center items-center">
          <div className="w-full h-full relative z-0" ref={viewer}>
            <canvas ref={mainCanvas}></canvas>
            <div onMouseUp={handleMouseUp} className="absolute inset-0 z-10 textLayer" ref={textDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFReader;
