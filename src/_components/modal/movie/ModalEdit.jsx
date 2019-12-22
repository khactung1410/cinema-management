import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import {movieActions} from '../../../_actions'
import { connect } from 'react-redux';


class ModalEdit extends React.Component {
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
        this.modalEdit = this.props.modalEdit
    }

    componentDidUpdate(prevProps) {
        const id = this.props.idEditting
        if ((id && (id !== prevProps.idEditting))) {
            const movie = this.props.movies.movie ? this.props.movies.movie[0] : null
            if(movie) {
                this.setState({
                    movie: {
                        name: movie.name,
                        genre: movie.genre,
                        director: movie.director,
                        publicYear: movie.publicYear,
                        description: movie.description,
                        trailer: movie.trailer
                    }
                })
            }
        }
    }

    handleClose = (modal) => {
        return () => {
            const movie = this.props.movies.movie ? this.props.movies.movie[0] : null
            this.setState({
                movie: {
                    name: movie.name,
                    genre: movie.genre,
                    director: movie.director,
                    publicYear: movie.publicYear,
                    description: movie.description,
                    trailer: movie.trailer
                }
            })
            modal.current.handleClose()
        }
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

    editMovie = (event) => {
        event.preventDefault();
        const id = this.props.idEditting
        const {movie} = this.state
        const edittingMovie = {
            ...movie,
            id
        }
        this.props.editMovie(edittingMovie)
    }
  
    render() {
        return (
            <CommonModal ref={this.modalEdit}>
                    <form onSubmit={this.editMovie}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Edit Movie</h4>
                            <button type="button" className="close" onClick={this.handleClose(this.modalEdit)}>×</button>
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
                                value={this.state.movie.name}
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
                                value={this.state.movie.genre}
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
                                value={this.state.movie.director}
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
                                value={this.state.movie.publicYear}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="description"
                                value={this.state.movie.description}
                            />
                        </div>				
                        <div className="form-group">
                            <label>Trailer</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                name="trailer"
                                value={this.state.movie.trailer}
                            />
                        </div>
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" defaultValue="Cancel" onClick={this.handleClose(this.modalEdit)} />
                            <input type="submit" className="btn btn-success" value="Save" />
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
    getMovieById: movieActions.getById,
    editMovie: movieActions.edit
}

const connectedModalEdit = connect(mapState, actionCreators)(ModalEdit);
export { connectedModalEdit as ModalEdit };