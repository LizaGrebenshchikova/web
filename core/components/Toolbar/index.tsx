import './style.less';

import * as React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export type Direction = 'up' | 'left' | 'right' | 'down';
export type Rotation = 'left' | 'right';
export type ZDirection = 'up' | 'down';

export interface ToolbarCallbacks {
    onClickSave: () => void;
    onClickChangePos: (direction: Direction) => void;
    onClickChangeRot: (rotation: Rotation) => void;
    onClickChangeZidx: (direction: ZDirection) => void;
}

interface ToolbarProps {
    prefixCls?: string;

    callbacks: ToolbarCallbacks;
}

export default class Toolbar extends React.Component<ToolbarProps> {
    static defaultProps = {
        prefixCls: 'control-toolbar'
    }

    render() {
        const { prefixCls } = this.props;
        const groupCls = `${prefixCls}__group`;

        return (
            <ButtonToolbar className={prefixCls}>
                <ButtonGroup className={groupCls}>
                    <Button variant='outline-primary' onClick={this.getChangePosHandler('up')}>↑</Button>
                    <Button variant='outline-primary' onClick={this.getChangePosHandler('down')}>↓</Button>
                    <Button variant='outline-primary' onClick={this.getChangePosHandler('right')}>→</Button>
                    <Button variant='outline-primary' onClick={this.getChangePosHandler('left')}>←</Button>
                </ButtonGroup>
                <ButtonGroup className={groupCls}>
                    <Button variant='outline-primary' onClick={this.getChangeZidxHandler('up')}>z+</Button>
                    <Button variant='outline-primary' onClick={this.getChangeZidxHandler('down')}>z-</Button>
                </ButtonGroup>
                <ButtonGroup className={groupCls}>
                    <Button variant='outline-primary' onClick={this.getChangeRotHandler('left')}>⭯</Button>
                    <Button variant='outline-primary' onClick={this.getChangeRotHandler('right')}>⭮</Button>
                </ButtonGroup>
                <Button 
                    className={`${prefixCls}__btn-save`} 
                    variant='outline-warning' 
                    onClick={this.handleClickSave}
                >
                    Save collage
                </Button>
            </ButtonToolbar>
        );
    }

    private handleClickSave = () => {
        this.props.callbacks.onClickSave();
    }

    private getChangePosHandler = (direction: Direction) => {
        const changePosHandler = () => {
            this.props.callbacks.onClickChangePos(direction);
        }

        return changePosHandler;
    }

    private getChangeRotHandler = (rotation: Rotation) => {
        const changeRotHandler = () => {
            this.props.callbacks.onClickChangeRot(rotation);
        }

        return changeRotHandler;
    }

    private getChangeZidxHandler = (direction: ZDirection) => {
        const changeZidxHandler = () => {
            this.props.callbacks.onClickChangeZidx(direction);
        }

        return changeZidxHandler;
    }
}