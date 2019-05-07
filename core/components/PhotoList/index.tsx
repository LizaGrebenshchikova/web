import './style.less';

import * as React from 'react';
import * as uniqid from 'uniqid';

import Photo from '../Photo';

interface PhotoListProps {
    photoUrls: string[];
    onAddPhoto: (idx: number) => void;
    onRemovePhoto: (idx: number) => void;
}

export default class PhotoList extends React.Component<PhotoListProps> {
    render() {
        return (
            <div className='photo-list'>
                {this.props.photoUrls.map((url, idx) => {
                    return (
                        <div key={uniqid()} className='photo-container'>
                            <Photo url={url} onClick={this.getAddPhotoHanlder(idx)} />
                            <div className='photo-container__remove-btn' onClick={this.getRemovePhotoHandler(idx)} />
                        </div>
                    )
                })}
            </div>
        );
    }

    private getAddPhotoHanlder = (idx: number) => {
        const addPhotoHandler = () => {
            this.props.onAddPhoto(idx);
        }

        return addPhotoHandler;
    }

    private getRemovePhotoHandler = (idx: number) => {
        const removePhotoHandler = () => {
            this.props.onRemovePhoto(idx);
        }

        return removePhotoHandler;
    }
}