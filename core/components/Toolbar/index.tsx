import './style.less';

import * as React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

interface ToolbarCallbacks {
    onClickSave: () => void;
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
                    <Button variant='outline-primary'>↑</Button>
                    <Button variant='outline-primary'>↓</Button>
                    <Button variant='outline-primary'>→</Button>
                    <Button variant='outline-primary'>←</Button>
                </ButtonGroup>
                <ButtonGroup className={groupCls}>
                    <Button variant='outline-primary'>z+</Button>
                    <Button variant='outline-primary'>z-</Button>
                </ButtonGroup>
                <ButtonGroup className={groupCls}>
                    <Button variant='outline-primary'>⭯</Button>
                    <Button variant='outline-primary'>⭮</Button>
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

    private handleClickSave() {
        this.props.callbacks.onClickSave();
    }
}