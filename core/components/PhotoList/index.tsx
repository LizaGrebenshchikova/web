import './style.less';

import * as React from 'react';

import Photo from '../Photo';

interface PhotoListProps {
    photoUrls: string[];
    onAddPhoto: (idx: number) => void;
}

export default class PhotoList extends React.Component<PhotoListProps> {
    render() {
        return (
            <div className='photo-list'>
                {this.props.photoUrls.map((url, idx) => {
                    return (
                        <div key={idx} className='photo-container' onClick={this.handleAddPhoto(idx)}>
                            <Photo url={url} />
                            <div className='photo-container__remove-btn'></div>
                        </div>
                    )
                })}
            </div>
        );
    }

    private handleAddPhoto = (idx: number) => {
        const addPhotoHandler = () => {
            this.props.onAddPhoto(idx);
        }

        return addPhotoHandler;
    }
}