import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Highlight from "../components/Highlight";
import usePdf from "../components/usePdf";

const PDFReader = () => {

  const [highlights, setHighlights] = useState([{ title: Date.now, body: "hello" }]);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  let viewer = useRef();
  let textDiv = useRef();
  let mainCanvas = useRef();

  let url = "1.pdf";
  url = "https://arxiv.org/pdf/1708.08021.pdf";
  url = "https://arxiv.org/pdf/1604.02480.pdf";
  url = "2.pdf";
  const reader = usePdf(viewer, mainCanvas, textDiv);

  useEffect(() => {
    const initReader = async () => {
      await reader.loadPdf(url)
    }
    initReader().catch(console.error);;
  })

  // useEffect(() => {
  //   const renderPage = async () => {
  //     if(!reader) return;
  //     await reader.renderPage(pageNumber, scale);
  //   } 
  //   renderPage().catch(console.error);;
  // },[pageNumber, scale])

  const high = () => { console.log("high") }

  const handleMouseUp = () => {
    highlight2();
    //setHighlights([{title: "page 1", body: text }]);
  }
  function highlight2() {
    console.clear();
    var sel = window.getSelection(),
      range = sel.getRangeAt(0),
      parent = range.commonAncestorContainer,
      start = range.startContainer,
      end = range.endContainer;
    var startDOM = (start.parentElement == parent) ? start.nextSibling : start.parentElement;
    var currentDOM = startDOM.nextElementSibling;
    var endDOM = (end.parentElement == parent) ? end : end.parentElement;
    let start_id = [...startDOM.parentNode.childNodes].indexOf(startDOM);
    let end_id = [...endDOM.parentNode.childNodes].indexOf(endDOM)
    console.log(start_id, start);
    console.log(end_id, end);
    for (let i = start_id; i <= end_id; i++) {
      endDOM.parentNode.childNodes[i].style.background = "green";
      console.log(i, endDOM.parentNode.childNodes[i]);
    }
    // startDOM.style.background="green";
    // endDOM.style.background="green";
    sel.removeRange(range);


    //Process Start Element
    // highlightText(startDOM, 'START', range.startOffset);
    // while (currentDOM != endDOM && currentDOM != null) {
    //     highlightText(currentDOM);
    //     currentDOM = currentDOM.nextElementSibling;
    // }
    // //Process End Element
    // highlightText(endDOM, 'END', range.endOffset);
  }

  function highlightText(elem, offsetType, idx) {
    if (elem.nodeType == 3) {
      var span = document.createElement('span');
      span.setAttribute('class', 'highlight2');
      var origText = elem.textContent, text, prevText, nextText;
      if (offsetType == 'START') {
        text = origText.substring(idx);
        prevText = origText.substring(0, idx);
      } else if (offsetType == 'END') {
        text = origText.substring(0, idx);
        nextText = origText.substring(idx);
      } else {
        text = origText;
      }
      span.textContent = text;

      var parent = elem.parentElement;
      parent.replaceChild(span, elem);
      if (prevText) {
        var prevDOM = document.createTextNode(prevText);
        parent.insertBefore(prevDOM, span);
      }
      if (nextText) {
        var nextDOM = document.createTextNode(nextText);
        //parent.appendChild(nextDOM);
        parent.insertBefore(nextDOM, span.nextSibling);
        //parent.insertBefore(span, nextDOM);
      }
      return;
    }
    var childCount = elem.childNodes.length;
    for (var i = 0; i < childCount; i++) {
      if (offsetType == 'START' && i == 0)
        highlightText(elem.childNodes[i], 'START', idx);
      else if (offsetType == 'END' && i == childCount - 1)
        highlightText(elem.childNodes[i], 'END', idx);
      else
        highlightText(elem.childNodes[i]);
    }
  }
  const highlight = () => {
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    const {
      commonAncestorContainer,
      startContainer,
      endContainer,
      startOffset,
      endOffset,
    } = range;
    const nodes = [];

    console.group("range");

    console.log("range", range);
    console.log("commonAncestorContainer", commonAncestorContainer);
    console.log("startContainer", startContainer);
    console.log("endContainer", endContainer);
    console.log("startOffset", startOffset);
    console.log("endOffset", endOffset);
    console.log("startContainer.parentNode", startContainer.parentNode);
    console.groupEnd();

    if (startContainer === endContainer) {
      const span = document.createElement("span");
      span.className = "highlight2";
      range.surroundContents(span);
      return;
    }

    // get all posibles selected nodes
    function getNodes(childList) {
      console.group("***** getNode: ", childList);
      childList.forEach((node) => {

        const nodeSel = sel.containsNode(node, true);
        // if is not selected
        if (!nodeSel) return;
        console.log("node:", node, "nodoType", node.nodeType);
        const tempStr = node.nodeValue;
        console.log("nodeValue:", tempStr);

        if (node.nodeType === 3 && tempStr.replace(/^\s+|\s+$/gm, "") !== "") {
          console.log("nodo agregado");
          nodes.push(node);
        }

        if (node.nodeType === 1) {
          if (node.childNodes) getNodes(node.childNodes);
        }
      });
      console.groupEnd();
    }

    getNodes(commonAncestorContainer.childNodes);

    console.log(nodes);

    nodes.forEach((node, index, listObj) => {
      const { nodeValue } = node;
      let text, prevText, nextText;

      if (index === 0) {
        prevText = nodeValue.substring(0, startOffset);
        text = nodeValue.substring(startOffset);
      } else if (index === listObj.length - 1) {
        text = nodeValue.substring(0, endOffset);
        nextText = nodeValue.substring(endOffset);
      } else {
        text = nodeValue;
      }

      const span = document.createElement("span");
      span.className = "highlight2";
      span.append(document.createTextNode(text));
      const { parentNode } = node;

      parentNode.replaceChild(span, node);

      if (prevText) {
        const prevDOM = document.createTextNode(prevText);
        parentNode.insertBefore(prevDOM, span);
      }

      if (nextText) {
        const nextDOM = document.createTextNode(nextText);
        parentNode.insertBefore(nextDOM, span.nextSibling);
      }
    });

    sel.removeRange(range);
  }
  return (
    <div className="relative bg-gray-300 w-full h-screen  overflow-y-hidden flex flex-col items-start justify-start text-center text-lg text-gray-600 font-inter">
      <Header reader={reader} high={high} />
      <div className="flex-[1] self-stretch flex flex-row items-start justify-start">
        <div className="overflow-y-auto h-screen self-stretch border-t-[0px_solid_#8a85ab] border-r-[1px_solid_#8a85ab] border-b-[0px_solid_#8a85ab] border-l-[0px_solid_#8a85ab] box-border relative w-[471px] shrink-0 flex flex-col p-[20px_0px] items-start justify-start gap-[15px]">
          <b className="self-stretch relative tracking-[0.1em] uppercase inline-block">
            highlights
          </b>
          <div className="flex-[1] self-stretch flex flex-col items-start justify-start gap-[10px]">
            {/* {highlights.map((hgh) => <Highlight key={hgh.title} title={hgh.title} body={hgh.body} />)} */}
            <Highlight title="Page1" body="Body" />
          </div>
        </div>
        <div className="flex-[1] overflow-y-auto w-full h-screen flex justify-center items-center">
          <div className="w-full h-full relative z-0" ref={viewer}>
            <canvas ref={mainCanvas}></canvas>
            <div onMouseUp={reader.highlightSelection} className="absolute inset-0 z-10 textLayer" ref={textDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFReader;
