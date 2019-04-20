import './style.less';

import * as React from 'react';
import { fabric } from 'fabric';

import { saveFabricCanvasScreenshot } from '../../services';
import { Direction, ZDirection } from '../Toolbar';

interface CanvasProps {
    height?: number;
    width?: number;
    directionGridStep?: number;
}

export default class Canvas extends React.Component<CanvasProps> {
    static defaultProps = {
        width: 400,
        height: 400,
        directionGridStep: 5
    }

    canvasRef = React.createRef<HTMLCanvasElement>();
    private fabricCanvas: fabric.Canvas;

    componentDidMount() {
        const {
            height,
            width
        } = this.props;

        this.fabricCanvas = new fabric.Canvas(this.canvasRef.current);
        this.fabricCanvas.setHeight(height);
        this.fabricCanvas.setWidth(width);
        this.fabricCanvas.selection = false;
        this.fabricCanvas.preserveObjectStacking = true;
    }

    render() {
        const {
            height,
            width
        } = this.props;

        return (
            <div className='collage-canvas' style={{ width, height }}>
                <canvas ref={this.canvasRef}>
                </canvas>
            </div>
        );
    }

    addPhoto(url: string) {
        const fabricCanvas = this.fabricCanvas;

        fabric.Image.fromURL(url, img => {
            fabricCanvas.add(img);
        });    
    }

    save() {        
        saveFabricCanvasScreenshot(this.fabricCanvas, 'collage', 'png');
    }

    changeSelectionPos(direction: Direction) {
        const step = this.props.directionGridStep;
        switch (direction) {
            case 'up':
                this.fabricCanvas.getActiveObject().top -= step;
                break;
            case 'down':
                this.fabricCanvas.getActiveObject().top += step;
                break;
            case 'left':
                this.fabricCanvas.getActiveObject().left -= step;
                break;
            case 'right':
                this.fabricCanvas.getActiveObject().left += step;
                break;
        }
        this.fabricCanvas.renderAll();
    }

    changeSelectionZidx(direction: ZDirection) {
        switch (direction) {
            case 'up':
                this.fabricCanvas.getActiveObject().bringForward();
                break;
            case 'down':
                this.fabricCanvas.getActiveObject().sendBackwards();
                break;
        }
    }

    clearSelection() {
        this.fabricCanvas.discardActiveObject();
        this.fabricCanvas.renderAll();
    }
}