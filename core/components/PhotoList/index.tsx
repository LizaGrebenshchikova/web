import * as React from 'react';

import Photo from '../Photo';

interface PhotoListProps {
    photos: Photo[];
}

export default class PhotoList extends React.Component<PhotoListProps> {
    render() {
        return (
            <div className='photo-list'>
                {this.props.photos}
            </div>
        );
    }
}