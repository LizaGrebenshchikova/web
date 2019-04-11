import './style.less';

import * as React from 'react';

import Photo from '../Photo';

interface PhotoListProps {
    photoUrls: string[];
}

export default class PhotoList extends React.Component<PhotoListProps> {
    render() {
        return (
            <div className='photo-list'>
                {this.props.photoUrls.map((url, idx) => <Photo key={idx} url={url} />)}
            </div>
        );
    }
}