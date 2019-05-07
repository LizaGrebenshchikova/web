import './style.less';

import * as React from 'react';

import PhotoList from '../PhotoList';

interface PhotosProps {
    onAddPhoto: (url: string) => void;
    prefixCls?: string;
}

interface PhotosState {
    photoUrls: string[];
}

export default class Photos extends React.Component<PhotosProps, PhotosState> {
    static defaultProps = {
        prefixCls: 'photos-container'
    }

    constructor(props: PhotosProps) {
        super(props);

        this.state = { photoUrls: [] };
    }

    render() {
        const { prefixCls } = this.props;

        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}__upload`}>
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.onLoadImage} />
                            <label className="custom-file-label" htmlFor='inputGroupFile01'>Choose file</label>
                        </div>
                    </div>
                </div>
                <div className={`${prefixCls}__list`}>
                    <PhotoList 
                        photoUrls={this.state.photoUrls} 
                        onAddPhoto={this.onAddPhoto} 
                        onRemovePhoto={this.onRemovePhoto} 
                    />
                </div>
            </div>
        );
    }

    private onLoadImage = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        const target = event.target as HTMLInputElement;

        fileReader.onload = (() => {
            const photoUrls = this.state.photoUrls.concat([fileReader.result as string])
            this.setState({ photoUrls });
            target.value = '';
        }).bind(this);

        fileReader.readAsDataURL(target.files[0]);
    }

    private onAddPhoto = (idx: number) => {
        this.props.onAddPhoto(this.state.photoUrls[idx]);
    }

    private onRemovePhoto = (idx: number) => {
        const photoUrls = this.state.photoUrls.slice();
        photoUrls.splice(idx, 1);
        this.setState({ photoUrls });
    }
}