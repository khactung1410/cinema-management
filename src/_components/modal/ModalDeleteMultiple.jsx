import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from './modal';
import { timingSafeEqual } from 'crypto';
import {movieActions} from '../../_actions'
import { connect } from 'react-redux';


class ModalDeleteMultiple extends React.Component {
    constructor(props) {
        super(props)
        this.modalDeleteMultiple = this.props.modalDeleteMultiple
    }

    handleClose = (modal) => {
        return () => {
            modal.current.handleClose()
        }
    }

    deleteMovie = (event) => {
        // const id = this.props.idDelete
        // if(id) {
        //     this.props.deleteSingleMovie(id)
        // }
        // event.preventDefault()
    }
  
    render() {
        return (
            <CommonModal ref={this.modalDeleteMultiple}>
                <form>
                    <div className="modal-header">						
                    <h4 className="modal-title">Delete Employee</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.handleClose(this.modalDeleteMultiple)}>×</button>
                    </div>
                    <div className="modal-body">					
                    <p>Are you sure you want to delete these Records?</p>
                    <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                    <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" onClick={this.handleClose(this.modalDeleteMultiple)}/>
                    <input type="submit" className="btn btn-danger" defaultValue="Delete" />
                    </div>
                </form>
            </CommonModal>
        );
    }
}

function mapState(state) {
    return {}
}
const actionCreators = {
    deleteSingleMovie: movieActions._delete,
    getMovies: movieActions.getAll
}

const connectedModalDeleteMultiple = connect(mapState, actionCreators)(ModalDeleteMultiple);
export { connectedModalDeleteMultiple as ModalDeleteMultiple };