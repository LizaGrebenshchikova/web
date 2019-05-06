import './style.less';

import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

interface SizeModalProps {
    show: boolean;
    initialWidth: number;
    initialHeight: number;
    onApply: (width: number, height: number) => void;
    onCancel: () => void;
    prefixCls?: string;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}

interface SizeModalState {
    width: number;
    height: number;
}

export default class SizeModal extends React.Component<SizeModalProps, SizeModalState> {
    static defaultProps = {
        prefixCls: 'size-modal',
        minWidth: 400,
        maxWidth: 1920,
        minHeight: 400,
        maxHeight: 1920
    }

    constructor(props: SizeModalProps) {
        super(props);

        const { initialWidth, initialHeight } = props;
        this.state = {
            width: initialWidth, height: initialHeight
        }
    }

    render() {
        const {
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
            initialWidth, 
            initialHeight, 
            prefixCls
        } = this.props;

        return (
            <Modal show={this.props.show} onHide={this.onCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Set canvas size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${prefixCls}__form-control`}
                            type='number'
                            step={1}
                            min={minWidth}
                            max={maxWidth}
                            defaultValue={`${initialWidth}`}
                            aria-label='width'
                            required={true}
                            onChange={this.handleChangeWidth}
                        />
                        <InputGroup.Text className={`${prefixCls}__infix-text`}>×</InputGroup.Text>
                        <FormControl
                            className={`${prefixCls}__form-control`}
                            type='number'
                            step={1}
                            min={minHeight}
                            max={maxHeight}
                            defaultValue={`${initialHeight}`}
                            aria-label='height'
                            required={true}
                            onChange={this.handleChangeHeight}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                    <Button variant="primary" onClick={this.onApply} disabled={!this.isValidSize}>Apply</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private handleChangeHeight = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement;
        this.setState({ height: parseInt(target.value) });
    } 

    private handleChangeWidth = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement;
        this.setState({ width: parseInt(target.value) });
    } 

    private get isValidSize(): boolean {
        const { width, height } = this.state;
        const { minWidth, maxWidth, minHeight, maxHeight } = this.props;

        return minWidth <= width && width <= maxWidth && minHeight <= height && height <= maxHeight;
    }

    private onApply = () => {
        if (!this.isValidSize) {
            return;
        }
        this.props.onApply(this.state.width, this.state.height);
    }

    private onCancel = () => {
        this.props.onCancel();
    }
}