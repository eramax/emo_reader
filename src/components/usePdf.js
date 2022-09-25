import { useState, useEffect } from 'react';
import * as PDFJS from "pdfjs-dist";
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { EventBus, TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";
PDFJS.GlobalWorkerOptions.workerSrc = pdfWorker

export default function usePdf(url, viewer, mainCanvas, textDiv) {
    const [pdfdoc, setPdfdoc] = useState(null);
    const [pageNo, setPageNo] = useState(1);
    const [scale, setScale] = useState(1);

    const renderPDF = async (path) => {
        let eventBus = new EventBus();
        eventBus.on("textlayerrendered", (evt) => {
            console.log(evt);
        })
        const pdfDocument = await PDFJS.getDocument({ url }).promise;
        setPdfdoc(pdfDocument);
        const numPages = pdfDocument.numPages;
        console.log(pdfDocument);

        const page = await pdfDocument.getPage(pageNo);
        let autoscale = viewer.current.offsetWidth / page.getViewport({ scale: 1.0 }).width;
        autoscale = Math.round((window.devicePixelRatio * autoscale - 0.1) * 10) / 10;
        console.log(autoscale);
        setScale(autoscale);

        const viewport = page.getViewport({ scale: autoscale });

        mainCanvas.current.height = viewport.height;
        mainCanvas.current.width = viewport.width;

        textDiv.current.innerHTML="";
        textDiv.current.height = viewport.height;
        textDiv.current.width = viewport.width;
        const renderContext = {
            canvasContext: mainCanvas.current.getContext("2d"),
            viewport
        };

        console.log("Rendering");
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
    };

    const nextPage = () => {
        console.log("next");
        setPageNo(pageNo + 1);
    }
    useEffect(() => {
        renderPDF(url).catch(console.error);
    }, [url, pageNo])


    return [pageNo, nextPage, scale, setScale];

}