import * as html2canvas from 'html2canvas';
import * as fileSaver from 'file-saver';

async function getCanvas(node: HTMLElement) {
    const canvas = await html2canvas(node);
    return canvas;
}

async function saveCanvasScreenshot(canvas: HTMLCanvasElement, fileName: string) {
    canvas.toBlob(blob => { fileSaver.saveAs(blob, fileName); });
}

async function saveNodeScreenshot(node: HTMLElement, fileName: string) {
    const canvas = await getCanvas(node);
    saveCanvasScreenshot(canvas, fileName);
}

function saveScreenshot(element: HTMLElement, fileName: string) {
    if (element instanceof HTMLCanvasElement) {
        saveCanvasScreenshot(element, fileName);
    }
    else {
        saveNodeScreenshot(element, fileName);   
    }
}

export { saveScreenshot };