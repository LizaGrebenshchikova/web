import './style.less';

import * as React from 'react';

import Image from 'react-bootstrap/Image';

interface PhotoProps {
    url: string;
    prefixCls?: string;
}

export default class Photo extends React.Component<PhotoProps> {
    static defaultProps = {
        prefixCls: 'photo'
    }

    render() {
        const { prefixCls } = this.props;

        return (
            <div className={prefixCls}>
                <Image src={this.props.url}/>
            </div>
        );
    }
}