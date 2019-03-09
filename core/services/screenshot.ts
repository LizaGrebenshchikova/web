import * as html2canvas from 'html2canvas';
import * as fileSaver from 'file-saver';

async function getCanvas(node: HTMLElement) {
    const canvas = await html2canvas(node);
    return canvas;
}

async function saveScreenshot(node: HTMLElement, fileName: string) {
    const canvas = await getCanvas(node);
    canvas.toBlob(blob => { fileSaver.saveAs(blob, fileName); });
}

export { saveScreenshot };