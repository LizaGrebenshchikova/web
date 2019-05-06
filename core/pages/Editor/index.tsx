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
import SizeModal from '../../components/SizeModal';

interface EditorProps {
    prefixCls?: string;
}

interface EditorState {
    height: number;
    width: number;
    showModal: boolean;
}

export default class Editor extends React.Component<EditorProps, EditorState> {
    static defaultProps = {
        prefixCls: 'collage-editor'
    }

    state = {
        height: 400,
        width: 400,
        showModal: false
    }

    private canvasRef = React.createRef<Canvas>();

    render() {
        const { prefixCls } = this.props;
        
        const toolbarCallbacks: ToolbarCallbacks = {
            onClickSave: this.onClickSave,
            onClickChangePos: this.onClickChangePos,
            onClickChangeRot: this.onClickChangeRot,
            onClickChangeZidx: this.onClickChangeZidx,
            onClickClearSelection: this.onClickClearSelection,
            onClickSetCanvasSize: this.onModalShow,
            onClickRemove: this.onRemovePhoto
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
                        <Canvas 
                            ref={this.canvasRef} 
                            height={this.state.height}
                            width={this.state.width}
                        />
                    </div>
                </div>
                <SizeModal
                    show={this.state.showModal}
                    initialWidth={this.state.width}
                    initialHeight={this.state.height}
                    onApply={this.onModalApply}
                    onCancel={this.onModalHide}
                />
            </div>
        );
    }

    private onAddPhoto = (url: string) => {
        this.canvasRef.current.addPhoto(url);
    }

    private onRemovePhoto = () => {
        this.canvasRef.current.removeSelected();
    }

    private onClickSave = () => {
        this.canvasRef.current.save();
    }

    private onClickClearSelection = () => {
        this.canvasRef.current.clearSelection();
    }

    private onModalShow = () => {
        this.setState({ showModal: true });
    }

    private onModalApply = (width: number, height: number) => {
        this.setState({ width, height, showModal: false });
    }

    private onModalHide = () => {
        this.setState({ showModal: false });
    }

    private onClickChangePos = (direction: Direction) => {
        this.canvasRef.current.changeSelectionPos(direction);
    }

    private onClickChangeRot = (rotation: Rotation) => {
        this.canvasRef.current.changeSelectionRot(rotation);
    }

    private onClickChangeZidx = (direction: ZDirection) => {
        this.canvasRef.current.changeSelectionZidx(direction);
    }
}