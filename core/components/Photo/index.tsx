import './style.less';

import * as React from 'react';

import Image from 'react-bootstrap/Image';

interface PhotoProps {
    url: string;
}

export default class Photo extends React.Component<PhotoProps> {
    render() {
        return (
            <div className="photo">
                <Image src={this.props.url} />
            </div>
        );
    }
}