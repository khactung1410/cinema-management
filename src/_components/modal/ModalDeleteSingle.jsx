import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from './modal';
import { timingSafeEqual } from 'crypto';
import {movieActions} from '../../_actions'
import { connect } from 'react-redux';


class ModalDeleteSingle extends React.Component {
    constructor(props) {
        super(props)
        this.modalDeleteSingle = this.props.modalDeleteSingle
    }

    handleClose = (modal) => {
        return () => {
            modal.current.handleClose()
        }
    }

    deleteMovie = (event) => {
        const id = this.props.idDelete
        if(id) {
            this.props.deleteSingleMovie(id)
        }
        event.preventDefault()
    }
  
    render() {
        return (
            <CommonModal ref={this.modalDeleteSingle}>
                <form onSubmit={this.deleteMovie}>
                    <div className="modal-header">						
                        <h4 className="modal-title">Delete Movie</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.handleClose(this.modalDeleteSingle)}>×</button>
                    </div>
                    <div className="modal-body">					
                        <p>Are you sure you want to delete this movie?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" onClick={this.handleClose(this.modalDeleteSingle)}/>
                        <input type="submit" className="btn btn-danger" value="Delete" onClick={this.handleClose(this.modalDeleteSingle)}/>
                    </div>
                </form>
            </CommonModal>
        );
    }
}

function mapState(state) {

}
const actionCreators = {
    deleteSingleMovie: movieActions._delete,
    getMovies: movieActions.getAll
}

const connectedModalDeleteSingle = connect(mapState, actionCreators)(ModalDeleteSingle);
export { connectedModalDeleteSingle as ModalDeleteSingle };