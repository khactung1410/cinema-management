import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import {genreActions} from '../../../_actions'
import { connect } from 'react-redux';


class ModalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            genre: {
                name: '',
                country: '',
                totalMovieHas: '0',
                language: ''
            }
        }
        this.modalEdit = this.props.modalEdit
    }

    componentDidUpdate(prevProps) {
        const id = this.props.idEditting
        if ((id && (id !== prevProps.idEditting))) {
            const genre = this.props.genres.genre ? this.props.genres.genre[0] : null
            if(genre) {
                this.setState({
                    genre: {
                        name: genre.name,
                        country: genre.country,
                        totalMovieHas: genre.totalMovieHas,
                        language: genre.language
                    }
                })
            }
        }
    }

    handleClose = (modal) => {
        return () => {
            const genre = this.props.genres.genre ? this.props.genres.genre[0] : null
            this.setState({
                genre: {
                    name: genre.name,
                    country: genre.country,
                    totalMovieHas: genre.totalMovieHas,
                    language: genre.language
                }
            })
            modal.current.handleClose()
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        const {genre} = this.state
        this.setState({
            genre: {
                ...genre,
                [name]: value
            }
        })
        setTimeout(()=>{console.log(this.state.genre)},500)
    }

    editGenre = (event) => {
        event.preventDefault();
        const id = this.props.idEditting
        const {genre} = this.state
        const edittingGenre = {
            ...genre,
            id
        }
        delete edittingGenre.totalMovieHas
        this.props.editGenre(edittingGenre)
    }
  
    render() {
        return (
            <CommonModal ref={this.modalEdit}>
                    <form onSubmit={this.editGenre}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Edit Genre</h4>
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
                                value={this.state.genre.name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="country"
                                value={this.state.genre.country}
                            />
                        </div>
                        <div className="form-group">
                            <label>Language</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="language"
                                value={this.state.genre.language}
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
    const {genres} = state
    return {genres}
}
const actionCreators = {
    editGenre: genreActions.edit
}

const connectedModalEdit = connect(mapState, actionCreators)(ModalEdit);
export { connectedModalEdit as ModalEdit };