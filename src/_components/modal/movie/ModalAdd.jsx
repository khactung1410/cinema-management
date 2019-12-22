import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import { timingSafeEqual } from 'crypto';
import {movieActions} from '../../../_actions'
import { connect } from 'react-redux';


class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
        this.preview = React.createRef();
        this.modalAdd = this.props.modalAdd
    }

    handleClose = (modal) => {
        return () => modal.current.handleClose()
    }

    addMovie = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)
        this.props.addMovie(formData)
    }

    uploadPoster = (event) => {
        const target = event.target

        if (target.files && target.files[0]) {
            var reader = new FileReader();

            reader.onload = (e) => {
                this.preview.current.src = e.target.result;
            }

            reader.readAsDataURL(target.files[0]);
        }
    }

    render() {
        return (
            <CommonModal ref={this.modalAdd}>
                    <form onSubmit={this.addMovie}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Add Movie</h4>
                            <button type="button" className="close" onClick={this.handleClose(this.modalAdd)}>×</button>
                        </div>
                        <div className="modal-body">
                        <div className="col">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control" 
                                required
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                name="genre"
                            />
                        </div>
                        <div className="form-group">
                            <label>Director</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                name="director"
                            />
                        </div>
                        <div className="form-group">
                            <label>Public Year</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                required 
                                name= "publicYear"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea 
                                className="form-control" 
                                required 
                                name="description"
                            />
                        </div>
                        <div className="form-group">
                            <label>Trailer</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                name="trailer"
                            />
                        </div>
                        <div className="form-group">
                            <label>Poster</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control" 
                                required 
                                onChange={this.uploadPoster}
                                name="poster"
                            />
                        </div>
                        </div>
                        <div className="col">
                            <img ref={this.preview} />
                        </div>
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" defaultValue="Cancel" onClick={this.handleClose(this.modalAdd)} />
                            <input type="submit" className="btn btn-success" value="Add"/>
                        </div>
                    </form>
                </CommonModal> 
        );
    }
}

function mapState(state) {
    const {movies} = state
    return {movies}
}
const actionCreators = {
    addMovie: movieActions.add
}

const connectedModalAdd = connect(mapState, actionCreators)(ModalAdd);
export { connectedModalAdd as ModalAdd };