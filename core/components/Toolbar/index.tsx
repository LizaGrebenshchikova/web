import './style.less';

import * as React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

interface ToolbarProps {
    prefixCls?: string;
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
            </ButtonToolbar>
        );
    }
}