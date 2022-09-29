import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Highlight from "../components/Highlight";
import * as PDFJS from "pdfjs-dist";
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { EventBus, TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";
PDFJS.GlobalWorkerOptions.workerSrc = pdfWorker

export default function PDFReader() {
  console.log("PDFReader-init");
  // let url = "1.pdf";
  // url = "https://arxiv.org/pdf/1708.08021.pdf";
  // url = "https://arxiv.org/pdf/1604.02480.pdf";
  // url = "2.pdf";
  const [highlights, set_highlights] = useState(
    [{ "id": "zrh2vcr1xefl8l9uiwg", "page": 1, "title": "Page-1", "body": "hello11", "start_id": 20, "end_id": 40, "color": "yellow" }, { "id": "l8mvoizvvg3od42qen", "title": "Page-1", "body": "ps it avoid introducing any latency in the usual edit-refresh cycle of rapid JavaScript development. We\ndescribe the algo", "page": 1, "start_id": 50, "end_id": 52, "color": "green" }, { "id": "l8mvol2rot4dilctazj", "title": "Page-1", "body": "Script is one of the most popular languages for writing web and mobile applications today. The\nlanguage facil", "page": 1, "start_id": 77, "end_id": 79, "color": "blue" }, { "id": "l8mvonnzrma4pbpzxjg", "title": "Page-1", "body": "raveling assumptions and guarantees in code written by others. In many other languages,\nthis overhead i", "page": 1, "start_id": 91, "end_id": 93, "color": "red" }, { "id": "l8mvopx6z5akfcjg0t", "title": "Page-1", "body": "d a lo", "page": 1, "start_id": 87, "end_id": 87, "color": "yellow" }, { "id": "l8mvow7qp0hakfbgqch", "title": "Page-1", "body": "fact, several useful type systems have been built for JavaScript in recent years. The\ndesign and imple", "page": 1, "start_id": 116, "end_id": 118, "color": "yellow" }, { "id": "l8mvp00g8x19rcj76h9", "title": "Page-2", "body": "ustrate this system via a series of examples (Figure 1).\nHigher-order functions (lines 1–4) are quite common in JavaScript. Unfortunately, it is also\ncommon to use null as a default for everything (line 4). In particular, this causes the dreaded “null\nis not a function” error to hit often. Fortunately, Flow finds these errors by following flows of null\nto calls in the code.\nChecking for nullability is the idiomatic way to prevent such errors at runtime. (In JavaScript,\nthe check f != null is equivalent to f !== null && f !== undefined, which additionally rules\nout undefined, commonly used to denote missing values.) Thankfully Flow understands that this\ncode is safe. It refines the type of f to filter out null in line 6, and thus knows that null cannot\nreach the call. Many other idiomatic variants also work, such as f && f(x), where f is checked to\nbe truthy (ruling out null, undefined and other falsy values) before calling.\nRefinements also power a common technique to encode algebraic data types in JavaScript, which\nare used quite widely (to manage actions and dispatchers, data and queries, etc. in user interface\n1The values false, 0, \"\", null, undefined, and NaN are falsy. All other values are truthy.", "page": 2, "start_id": 140, "end_id": 256, "color": "blue" }, { "id": "l8mvp5gi96fkrjtph24", "title": "Page-2", "body": "atency in their normal workflow, because that\nwould defeat the whole purpose of ", "page": 2, "start_id": 8, "end_id": 10, "color": "red" }, { "id": "l8mvp7dayyg2t8vmt5e", "title": "Page-1", "body": "GIO", "page": 1, "start_id": 6, "end_id": 6, "color": "red" }, { "id": "l8mvpa2w8xqtt4lhup7", "title": "Page-1", "body": "g 201", "page": 1, "start_id": 140, "end_id": 140, "color": "red" }]);
  const [reader, set_reader] = useState({
    pageNumber: 0,
    selectionColor: "yellow",
    scale: 2,
    fit: 2,
    url: "2.pdf",
    pageCount: 0,
    page: null,
    pdfDoc: null,
    version: 0
  });
  useEffect(() => { init().catch(console.error) }, [])
  useEffect(() => { renderPage().catch(console.error) }, [reader.scale, reader.pageNumber])
  useEffect(() => { renderHighlights() }, [reader.version, highlights])

  const viewer = React.createRef();
  const canvas = React.createRef();
  const textLayerDiv = React.createRef();
  const eventBus = new EventBus();

  document.addEventListener('click', eve => {
    removeHighlight(eve.target);
  });
  const init = async () => {
    console.log("init", reader);
    let pdfDoc = await PDFJS.getDocument({ url: reader.url }).promise;
    set_reader(prev => ({ ...prev, pdfDoc, pageCount: pdfDoc.numPages, pageNumber: 1 }));
  }

  const renderPage = async () => {
    console.log("renderPage", reader);
    if (!reader.pageNumber) return;
    const page = await reader.pdfDoc.getPage(reader.pageNumber);

    let fit = viewer.current.offsetWidth / page.getViewport({ scale: 1.0 }).width;
    fit = Math.round((window.devicePixelRatio * fit - 0.1) * 10) / 10;

    const viewport = page.getViewport({ scale: reader.scale });
    canvas.current.height = viewport.height;
    canvas.current.width = viewport.width;
    textLayerDiv.current.innerHTML = "";
    const renderContext = {
      canvasContext: canvas.current.getContext("2d"),
      viewport
    };
    await page.render(renderContext);

    textLayerDiv.current.style.left = canvas.current.offsetLeft + 'px';
    textLayerDiv.current.style.top = canvas.current.offsetTop + 'px';
    textLayerDiv.current.style.height = canvas.current.offsetHeight + 'px';
    textLayerDiv.current.style.width = canvas.current.offsetWidth + 'px';

    const textContent = await page.getTextContent();
    const textLayer = new TextLayerBuilder({
      textLayerDiv: textLayerDiv.current,
      viewport,
      pageIndex: page.pageIndex,
      textDivs: [],
      eventBus: eventBus
    })

    textLayer.setTextContent(textContent)
    await textLayer.render();
    set_reader(prev => ({ ...prev, page, fit, version: prev.version + 1 }));
    console.log(`Page ${reader.pageNumber} Rendered`);
  }
  const nextPage = () => {
    console.log("next");
    if (reader.pageNumber < reader.pageCount) set_reader(prev => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
  }
  const prevPage = () => {
    console.log("next");
    if (reader.pageNumber > 1) set_reader(prev => ({ ...prev, pageNumber: prev.pageNumber - 1 }));
  }
  const zoomIn = () => {
    console.log("zoomIn");
    set_reader(prev => ({ ...prev, scale: Math.round((prev.scale + 0.1) * 10) / 10 }));
  }
  const zoomOut = () => {
    console.log("zoomOut");
    set_reader(prev => ({ ...prev, scale: Math.round((prev.scale - 0.1) * 10) / 10 }));
  }
  const fit = () => {
    console.log("fit");
    set_reader(prev => ({ ...prev, scale: prev.fit }));
  }
  const setColor = (color) => set_reader(prev => ({ ...prev, selectionColor: color }));
  const highlightSelection = () => {
    var sel = window.getSelection(),
      range = sel.getRangeAt(0),
      parent = range.commonAncestorContainer,
      start = range.startContainer,
      end = range.endContainer;
    var startDOM = (start.parentElement == parent) ? start.nextSibling : start.parentElement;
    var endDOM = (end.parentElement == parent) ? end : end.parentElement;
    let start_id = [...startDOM.parentNode.childNodes].indexOf(startDOM);
    let end_id = [...endDOM.parentNode.childNodes].indexOf(endDOM)
    let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    let hg = {
      id: uniqueId, title: `Page-${reader.pageNumber}`,
      body: sel.toString(), page: reader.pageNumber,
      start_id, end_id, color: reader.selectionColor
    };
    sel.removeRange(range);
    set_highlights(prev => ([...prev, hg]));
  }
  const renderHighlights = () => {
    //console.log(JSON.stringify(highlights));
    if (!reader.version) return;
    highlights.filter(hg => hg.page == reader.pageNumber).forEach(hg => { apply_highlight(hg) });
  }
  const apply_highlight = (hg) => {
    for (let i = hg.start_id; i <= hg.end_id; i++) {
      textLayerDiv.current.childNodes[i].classList.add('pdf-hg', `hg-${hg.id}`, `bg-${hg.color}`);
    }
  }
  const removeHighlight = (el) => {
    // if (el.classList.contains('pdf-hg')) {
    //     // get the highlight id and alert a popup to the user if he want to remove the whole highlight
    //     console.log('remove-hg');
    //     let identifier = [...el.classList].filter(s => s.includes('hg-'))[0];
    //     let color = [...el.classList].filter(s => s.includes('bg-'))[0];
    //     document.querySelectorAll(`.${identifier}`).forEach(node => {
    //         node.classList.remove('pdf-hg', identifier, color);
    //     });
    // }
  }

  return (
    <div className="relative bg-gray-300 w-full h-screen  overflow-y-hidden flex flex-col items-start justify-start text-center text-lg text-gray-600 font-inter">
      <Header reader={reader} prevPage={prevPage} nextPage={nextPage} fit={fit}
        zoomIn={zoomIn} zoomOut={zoomOut} setColor={setColor} high={console.log} />
      <div className="flex-[1] self-stretch flex flex-row items-start justify-start">
        <div className="overflow-y-auto h-screen self-stretch border-t-[0px_solid_#8a85ab] border-r-[1px_solid_#8a85ab] border-b-[0px_solid_#8a85ab] border-l-[0px_solid_#8a85ab] box-border relative w-[471px] shrink-0 flex flex-col p-[20px_0px] items-start justify-start gap-[15px]">
          <b className="self-stretch relative tracking-[0.1em] uppercase inline-block">
            highlights
          </b>
          <div className="flex-[1] self-stretch flex flex-col items-start justify-start gap-[10px]">
            {(highlights?.length > 0) && highlights.map((hg) => <Highlight key={hg.id} title={hg.title} body={hg.body} />)}
          </div>
        </div>
        <div className="flex-[1] overflow-y-auto w-full h-screen flex justify-center items-center">
          <div className="w-full h-full relative z-0" ref={viewer}>
            <canvas ref={canvas}></canvas>
            <div onMouseUp={highlightSelection} className="absolute inset-0 z-10 textLayer" ref={textLayerDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
