import React, { useEffect, useRef, useState } from "react";
import * as PDFJS from "pdfjs-dist";
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";
//import { PDFSinglePageViewer } from "pdfjs-dist/web/pdf_viewer";
//import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';


PDFJS.GlobalWorkerOptions.workerSrc = pdfWorker

const PdfView = ({ path }) => {
  let viewer = useRef();
  let textDiv = useRef();
  let pageNo = 1;
  let scale;

  const renderPDF = async (path) => {
    const pdfDocument = await PDFJS.getDocument({ url: path }).promise;
    const numPages = pdfDocument.numPages;
    console.log(pdfDocument);

    const page = await pdfDocument.getPage(pageNo);
    scale = viewer.current.offsetWidth / page.getViewport({ scale: 1.0 }).width;
    scale = Math.round((scale - 0.1) * 10) / 10;
    console.log(scale);
    const viewport = page.getViewport({ scale });

    let canvasInHTML = {
      canvas: undefined,
      textlayer: undefined,
      ctx: undefined
    };

    const li = document.createElement("div");
    li.setAttribute("id", "page-" + (page._pageIndex + 1));
    li.setAttribute("style", "position: relative;");

    canvasInHTML.canvas = document.createElement("canvas");
    canvasInHTML.ctx = canvasInHTML.canvas.getContext("2d");
    canvasInHTML.canvas.height = viewport.height;
    canvasInHTML.canvas.width = viewport.width;
    li.appendChild(canvasInHTML.canvas);

    // canvasInHTML.textlayer = document.createElement("div");
    // canvasInHTML.textlayer.height = viewport.height;
    // canvasInHTML.textlayer.width = viewport.width;
    // li.appendChild(canvasInHTML.textlayer);

    viewer.current.appendChild(li);

    const renderContext = {
      canvasContext: canvasInHTML.ctx,
      viewport
    };

    console.log("Rendering2");
    page.render(renderContext);
    const textContent = await page.getTextContent();
    console.log(textDiv);
    const textLayer = new TextLayerBuilder({
      textLayerDiv: textDiv.current,
      viewport,
      pageIndex: page.pageIndex,
    })
    textLayer.setTextContent(textContent)
    textLayer.render()
  };

  useEffect(() => {
    renderPDF(path).catch(console.error);
  }, [path])


  return (
    <div className="flex-[1] overflow-y-auto h-screen self-stretch flex p-[10px] box-border items-start justify-start text-center text-lg text-black font-inter">
      <div className="w-full" ref={viewer}>
        <div className="textLayer" ref={textDiv}></div>
      </div>
    </div>
  );
};

export default PdfView;
