import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from './modal';
import { timingSafeEqual } from 'crypto';
import {movieActions} from '../../_actions'
import { connect } from 'react-redux';


class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: {
                name: '',
                genre: '',
                director: '',
                publicYear: '',
                description: ''
            }
        }
        this.modalAdd = this.props.modalAdd
    }


    componentDidUpdate(prevProps) {
        const id = this.props.idEditting
        if ((this.props.idEditting !== prevProps.idEditting) && id) {
            this.props.getMovieById(this.props.idEditting)
        }
    }


    handleClose = (modal) => {
        return () => modal.current.handleClose()
    }

    addMovie = (event) => {
        event.preventDefault();
        const {movie} = this.state
        this.props.addMovie(movie)
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        const {movie} = this.state
        this.setState({
            movie: {
                ...movie,
                [name]: value
            }
        })
    }
  
    render() {
        const {movie} = this.props
        return (
            <CommonModal ref={this.modalAdd}>
                    <form onSubmit={this.addMovie}>
                        <div className="modal-header">						
                            <h4 className="modal-title">{this.props.idEditting?"Edit Movie":"Add Movie"}</h4>
                            <button type="button" className="close" onClick={this.handleClose(this.modalAdd)}>×</button>
                        </div>
                        <div className="modal-body">					
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control" 
                                required
                                onChange={this.handleChange}
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="genre"
                            />
                        </div>
                        <div className="form-group">
                            <label>Director</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="director"
                            />
                        </div>
                        <div className="form-group">
                            <label>Public Year</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name= "publicYear"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea 
                                className="form-control" 
                                required 
                                defaultValue={""} 
                                onChange={this.handleChange}
                                name="description"
                            />
                        </div>				
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" defaultValue="Cancel" onClick={this.handleClose(this.modalAdd)} />
                            <input type="submit" className="btn btn-success" value={this.props.idEditting?"Save":"Add"}/>
                        </div>
                    </form>
                </CommonModal> 
        );
    }
}

function mapState(state) {
    const {movie} = state
    return {movie}
}
const actionCreators = {
    getMovieById: movieActions.getById
}

const connectedModalAdd = connect(mapState, actionCreators)(ModalAdd);
export { connectedModalAdd as ModalAdd };