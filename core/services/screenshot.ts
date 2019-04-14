import * as html2canvas from 'html2canvas';
import * as fileSaver from 'file-saver';
import { fabric } from 'fabric';

async function getCanvas(node: HTMLElement) {
    const canvas = await html2canvas(node);
    return canvas;
}

export async function saveCanvasScreenshot(canvas: HTMLCanvasElement, fileName: string) {
    canvas.toBlob(blob => { fileSaver.saveAs(blob, fileName); });
}

export async function saveNodeScreenshot(node: HTMLElement, fileName: string) {
    const canvas = await getCanvas(node);
    saveCanvasScreenshot(canvas, fileName);
}

export async function saveFabricCanvasScreenshot(canvas: fabric.Canvas, fileName: string, format: string) {
    const url = canvas.toDataURL({ format });
    fileSaver.saveAs(url, `${fileName}.${format}`);
}