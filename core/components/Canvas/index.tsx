import * as React from 'react';
import { fabric } from 'fabric';

import { saveFabricCanvasScreenshot } from '../../services';
import { Direction, Rotation, ZDirection } from '../Toolbar';

interface CanvasProps {
    height: number;
    width: number;
    directionGridStep?: number;
    rotationGridStep?: number;
}

export default class Canvas extends React.Component<CanvasProps> {
    static defaultProps = {
        directionGridStep: 5,
        rotationGridStep: 5
    }

    canvasRef = React.createRef<HTMLCanvasElement>();
    private fabricCanvas: fabric.Canvas;

    componentDidMount() {
        const {
            height,
            width
        } = this.props;

        this.fabricCanvas = new fabric.Canvas(this.canvasRef.current);
        this.updateCanvasZoom(height, width);
        this.fabricCanvas.selection = false;
        this.fabricCanvas.preserveObjectStacking = true;
        this.fabricCanvas.setBackgroundColor('#fff', () => {});
    }

    componentDidUpdate(prevProps: CanvasProps) {
        const {
            height,
            width
        } = this.props;

        if (prevProps.height !== height || prevProps.width !== width) {
            this.updateCanvasZoom(height, width);
        }
    }

    render() {
        const {
            height,
            width
        } = this.props;

        return (
            <canvas className='collage-canvas' ref={this.canvasRef}>
            </canvas>
        );
    }

    addPhoto(url: string) {
        const fabricCanvas = this.fabricCanvas;

        fabric.Image.fromURL(url, img => {
            fabricCanvas.add(img);
        });    
    }

    removeSelected() {
        const selection = this.fabricCanvas.getActiveObject();
        if (!selection) {
            return;
        }

        this.fabricCanvas.remove(selection);
    }

    save() {        
        saveFabricCanvasScreenshot(this.fabricCanvas, 'collage', 'png');
    }

    changeSelectionPos(direction: Direction) {
        const selection = this.fabricCanvas.getActiveObject();
        if (!selection) {
            return;
        }

        const step = this.props.directionGridStep;
        switch (direction) {
            case 'up':
                selection.top -= step;
                break;
            case 'down':
                selection.top += step;
                break;
            case 'left':
                selection.left -= step;
                break;
            case 'right':
                selection.left += step;
                break;
        }
        this.fabricCanvas.renderAll();
    }

    changeSelectionRot(rotation: Rotation) {
        const selection = this.fabricCanvas.getActiveObject();
        if (!selection) {
            return;
        }

        const angle = selection.angle + this.props.rotationGridStep * (rotation === 'left' ? -1 : 1);
        switch (rotation) {
            case 'left':
                selection.rotate(angle);
                break;
            case 'right':
                selection.rotate(angle);
                break;
        }
        this.fabricCanvas.renderAll();
    }

    changeSelectionZidx(direction: ZDirection) {
        const selection = this.fabricCanvas.getActiveObject();
        if (!selection) {
            return;
        }

        switch (direction) {
            case 'up':
                selection.bringForward();
                break;
            case 'down':
                selection.sendBackwards();
                break;
        }
    }

    clearSelection() {
        this.fabricCanvas.discardActiveObject();
        this.fabricCanvas.renderAll();
    }

    private updateCanvasZoom(canvasHeight: number, canvasWidth: number) {
        const { height, width } = this.canvasRef.current.parentElement.parentElement.getBoundingClientRect();
        const zoomScale = Math.min((height - 40) / canvasHeight, (width - 40) / canvasWidth, 1);
        
        this.fabricCanvas.setZoom(zoomScale);
        this.fabricCanvas.setHeight(canvasHeight * zoomScale);
        this.fabricCanvas.setWidth(canvasWidth * zoomScale);
    }
}