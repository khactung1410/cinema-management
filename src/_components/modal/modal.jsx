import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

class CommonModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });
  
    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>{this.props.children}</Modal>
        );
    }
}
  
export { CommonModal};