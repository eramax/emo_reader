import { useState, useEffect } from 'react';
import * as PDFJS from "pdfjs-dist";
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { EventBus, TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";
PDFJS.GlobalWorkerOptions.workerSrc = pdfWorker

class PdfReader {
    constructor(viewer, canvas, textLayerDiv, autoscale = true, scale = 1) {
        this.viewer = viewer
        this.canvas = canvas
        this.textLayerDiv = textLayerDiv
        this.autoscale = autoscale
        this.scale = scale
        this.eventBus = new EventBus();
        this.selectionColor = "green"
        globalThis.reader = this
        this.eventBus.on('textlayerrendered', (evt) => {
            console.log('textlayerrendered')
            this.renderHighlights()
        })
        document.addEventListener('click', eve => {
            if(eve.target.classList.contains('pdf-hg'))
            {
                // get the highlight id and alert a popup to the user if he want to remove the whole highlight
                console.log('pdf-hg');
                eve.target.classList.remove('pdf-hg');
                eve.target.style.background ="white";
            }
        });
    }
    loadPdf = async (url, pageNumber = 1, highlights = []) => {
        this.url = url
        this.highlights = highlights
        this.pageNumber = pageNumber
        this.pdfDoc = await PDFJS.getDocument({ url: this.url }).promise;
        this.pageCount = this.pdfDoc.numPages
        await this.renderPage();
    }
    renderPage = async () => {
        const page = await this.pdfDoc.getPage(this.pageNumber);
        if (this.autoscale) {
            this.scale = this.viewer.current.offsetWidth / page.getViewport({ scale: 1.0 }).width;
            this.scale = Math.round((window.devicePixelRatio * this.scale - 0.1) * 10) / 10;
            this.fit = this.scale;
        }
        const viewport = page.getViewport({ scale: this.scale });
        this.canvas.current.height = viewport.height;
        this.canvas.current.width = viewport.width;
        this.textLayerDiv.current.innerHTML = "";
        // this.textLayerDiv.current.height = viewport.height;
        // this.textLayerDiv.current.width = viewport.width;
        const renderContext = {
            canvasContext: this.canvas.current.getContext("2d"),
            viewport
        };
        await page.render(renderContext);

        this.textLayerDiv.current.style.left = this.canvas.current.offsetLeft + 'px';
        this.textLayerDiv.current.style.top = this.canvas.current.offsetTop + 'px';
        this.textLayerDiv.current.style.height = this.canvas.current.offsetHeight + 'px';
        this.textLayerDiv.current.style.width = this.canvas.current.offsetWidth + 'px';

        const textContent = await page.getTextContent();
        const textLayer = new TextLayerBuilder({
            textLayerDiv: this.textLayerDiv.current,
            viewport,
            pageIndex: page.pageIndex,
            textDivs: [],
            eventBus: this.eventBus
        })

        textLayer.setTextContent(textContent)
        textLayer.render();
        console.log(`Page ${this.pageNumber} Rendered`);
    }
    nextPage = async () => {
        console.log("next");
        if (this.pageNumber < this.pageCount) {
            this.pageNumber++;
            await this.renderPage();
        }
    }
    prevPage = async () => {
        console.log("prev");
        if (this.pageNumber > 1) {
            this.pageNumber--;
            await this.renderPage();
        }
    }
    zoomIn = async () => {
        console.log("zoomIn");
        this.autoscale = false;
        this.scale = Math.round((this.scale * 1.1) * 10) / 10;
        await this.renderPage();
    }
    zoomOut = async () => {
        console.log("zoomOut");
        this.autoscale = false;
        this.scale = Math.round((this.scale / 1.1) * 10) / 10;
        await this.renderPage();
    }
    autoscale = async () => {
        console.log("autoscale");
        this.autoscale = true;
        await this.renderPage();
    }
    changeColor = (color) => this.selectionColor = color;
    highlightSelection = () => {
        var sel = window.getSelection(),
            range = sel.getRangeAt(0),
            parent = range.commonAncestorContainer,
            start = range.startContainer,
            end = range.endContainer;
        var startDOM = (start.parentElement == parent) ? start.nextSibling : start.parentElement;
        var endDOM = (end.parentElement == parent) ? end : end.parentElement;
        let start_id = [...startDOM.parentNode.childNodes].indexOf(startDOM);
        let end_id = [...endDOM.parentNode.childNodes].indexOf(endDOM)
        sel.removeRange(range);
        this.highlight(start_id, end_id, this.selectionColor);
        this.highlights.push({ start_id, end_id, color: this.selectionColor });
    }
    highlight = (start_id, end_id, color) => {
        for (let i = start_id; i <= end_id; i++) {
            this.textLayerDiv.current.childNodes[i].style.background = color;
            this.textLayerDiv.current.childNodes[i].classList.add('pdf-hg');
            //console.log(i, this.textLayerDiv.current.childNodes[i]);
        }
    }
    renderHighlights = () => {
        this.highlights.forEach(hg => {this.highlight(hg.start_id, hg.end_id, hg.color)});
    }
}

export default function usePdf(viewer, canvas, textLayerDiv, autoscale = true, scale = 1) {
    const [pdfReader, setPdfReader] = useState(new PdfReader(viewer, canvas, textLayerDiv, autoscale, scale));
    return pdfReader;
}