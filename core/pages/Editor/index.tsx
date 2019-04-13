import './style.less';

import * as React from 'react';

import Photos from '../../components/Photos';
import Toolbar from '../../components/Toolbar';
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

        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}__aside`}>
                    <Photos onAddPhoto={this.onAddPhoto} />
                </div>
                <div className={`${prefixCls}__content`}>
                    <div className={`${prefixCls}__content-toolbar`}>
                        <Toolbar />
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
}