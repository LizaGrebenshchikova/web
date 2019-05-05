import './style.less';

import * as React from 'react';
import { fabric } from 'fabric';

import { saveFabricCanvasScreenshot } from '../../services';
import { Direction, Rotation, ZDirection } from '../Toolbar';

interface CanvasProps {
    height?: number;
    width?: number;
    directionGridStep?: number;
    rotationGridStep?: number;
}

export default class Canvas extends React.Component<CanvasProps> {
    static defaultProps = {
        width: 400,
        height: 400,
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
}