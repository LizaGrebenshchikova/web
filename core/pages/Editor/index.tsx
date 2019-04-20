import './style.less';

import * as React from 'react';

import Photos from '../../components/Photos';
import Toolbar, { 
    ToolbarCallbacks, 
    Direction, 
    Rotation, 
    ZDirection 
} from '../../components/Toolbar';
import Canvas from '../../components/Canvas';

interface EditorProps {
    prefixCls?: string;
}

export default class Editor extends React.Component<EditorProps> {
    static defaultProps = {
        prefixCls: 'collage-editor'
    }

    private canvasRef = React.createRef<Canvas>();

    render() {
        const { prefixCls } = this.props;
        
        const toolbarCallbacks: ToolbarCallbacks = {
            onClickSave: this.onClickSave,
            onClickChangePos: this.onClickChangePos,
            onClickChangeRot: this.onClickChangeRot,
            onClickChangeZidx: this.onClickChangeZidx
        };

        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}__aside`}>
                    <Photos onAddPhoto={this.onAddPhoto} />
                </div>
                <div className={`${prefixCls}__content`}>
                    <div className={`${prefixCls}__content-toolbar`}>
                        <Toolbar callbacks={toolbarCallbacks}/>
                    </div>
                    <div className={`${prefixCls}__content-workarea`}>
                        <Canvas ref={this.canvasRef} />
                    </div>
                </div>
            </div>
        );
    }

    private onAddPhoto = (url: string) => {
        this.canvasRef.current.addPhoto(url);
    }

    private onClickSave = () => {
        this.canvasRef.current.save();
    }

    private onClickChangePos = (direction: Direction) => {

    }

    private onClickChangeRot = (rotation: Rotation) => {

    }

    private onClickChangeZidx = (direction: ZDirection) => {

    }
}