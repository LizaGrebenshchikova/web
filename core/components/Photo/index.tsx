import './style.less';

import * as React from 'react';

import Image from 'react-bootstrap/Image';

interface PhotoProps {
    url: string;
    onClick: () => void;
    prefixCls?: string;
}

export default class Photo extends React.Component<PhotoProps> {
    static defaultProps = {
        prefixCls: 'photo'
    }

    render() {
        const {
            url,
            onClick,
            prefixCls
        } = this.props;

        return (
            <div className={prefixCls} onClick={onClick}>
                <Image src={url} />
            </div>
        );
    }
}