import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import Photo from '../Photo';
import PhotoList from '../PhotoList';

interface PhotosProps { }

interface PhotosState {
    photos: Photo[];
}

export default class Photos extends React.Component<PhotosProps, PhotosState> {
    constructor(props: PhotosProps) {
        super(props);

        this.state = { photos: [] };
    }

    render() {
        return (
            <Container>
                <Row>
                    <Button>Load photos</Button>
                </Row>
                <Row>
                    <PhotoList photos={this.state.photos} />
                </Row>
            </Container>
        );
    }
}