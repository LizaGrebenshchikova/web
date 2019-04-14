import './style.less';

import * as React from 'react';
import { fabric } from 'fabric';

import { saveFabricCanvasScreenshot } from '../../services';

interface CanvasProps {
    height?: number;
    width?: number;
}

export default class Canvas extends React.Component<CanvasProps> {
    static defaultProps = {
        width: 400,
        height: 400
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
}