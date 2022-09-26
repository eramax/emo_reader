import { useState, useEffect } from 'react';
import * as PDFJS from "pdfjs-dist";
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { EventBus, TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";
PDFJS.GlobalWorkerOptions.workerSrc = pdfWorker

export default function usePdf(url, viewer, mainCanvas, textDiv) {
    const [pageNo, setPageNo] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [scale, setScale] = useState(2);
    const [autoscaleVal, setAutoScaleVal] = useState(2);

    const renderPDF = async (path) => {
        let eventBus = new EventBus();
        eventBus.on("textlayerrendered", (evt) => {
            console.log(evt);
        })
        const pdfDocument = await PDFJS.getDocument({ url }).promise;
        setPageCount(pdfDocument.numPages);

        const page = await pdfDocument.getPage(pageNo);

        let _autoscale = viewer.current.offsetWidth / page.getViewport({ scale: 1.0 }).width;
        _autoscale = Math.round((window.devicePixelRatio * _autoscale - 0.1) * 10) / 10;
        console.log(_autoscale);
        setAutoScaleVal(_autoscale);

        const viewport = page.getViewport({ scale });

        mainCanvas.current.height = viewport.height;
        mainCanvas.current.width = viewport.width;

        textDiv.current.innerHTML = "";
        textDiv.current.height = viewport.height;
        textDiv.current.width = viewport.width;
        const renderContext = {
            canvasContext: mainCanvas.current.getContext("2d"),
            viewport
        };

        page.render(renderContext);

        textDiv.current.style.left = mainCanvas.current.offsetLeft + 'px';
        textDiv.current.style.top = mainCanvas.current.offsetTop + 'px';
        textDiv.current.style.height = mainCanvas.current.offsetHeight + 'px';
        textDiv.current.style.width = mainCanvas.current.offsetWidth + 'px';

        const textContent = await page.getTextContent();
        const textLayer = new TextLayerBuilder({
            textLayerDiv: textDiv.current,
            viewport,
            pageIndex: page.pageIndex,
            textDivs: [],
            eventBus
        })

        textLayer.setTextContent(textContent)
        textLayer.render();
        console.log("Rendered");
    };

    const nextPage = () => {
        console.log("next");
        setPageNo(pageNo + 1);
    }
    const prevPage = () => {
        console.log("prev");
        setPageNo(pageNo - 1);
    }
    const zoomIn = () => {
        console.log("zoomIn");
        setScale(scale * 1.1);
    }
    const zoomOut = () => {
        console.log("zoomOut");
        setScale(scale / 1.1);
    }
    const autoscale = () => {
        console.log("autoscale");
        setScale(autoscale);
    }
    useEffect(() => {
        renderPDF(url).catch(console.error);
    }, [url, pageNo, scale])


    return [pageNo, pageCount, nextPage, prevPage, scale, autoscale, zoomIn, zoomOut];

}