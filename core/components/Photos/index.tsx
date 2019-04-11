import './style.less';

import * as React from 'react';

import Photo from '../Photo';
import PhotoList from '../PhotoList';

interface PhotosProps {
    className: string;
}

interface PhotosState {
    photoUrls: string[];
}

export default class Photos extends React.Component<PhotosProps, PhotosState> {
    static defaultProps = {
        className: 'photos-container'
    }

    constructor(props: PhotosProps) {
        super(props);

        this.state = { photoUrls: [] };
    }

    render() {
        const { className } = this.props;

        return (
            <div className={className}>
                <div className={`${className}__upload`}>
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.onLoadImage.bind(this)} />
                            <label className="custom-file-label" htmlFor='inputGroupFile01'>Choose file</label>
                        </div>
                    </div>
                </div>
                <div className={`${className}__list`}>
                    <PhotoList photoUrls={this.state.photoUrls} />
                </div>
            </div>
        );
    }

    private onLoadImage = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        fileReader.onload = (() => {
            const photoUrls = this.state.photoUrls.concat([fileReader.result as string])
            this.setState({ photoUrls });
        }).bind(this);

        const target = event.target as HTMLInputElement;
        fileReader.readAsDataURL(target.files[0]);
    }
}