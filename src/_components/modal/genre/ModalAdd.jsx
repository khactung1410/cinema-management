import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import { timingSafeEqual } from 'crypto';
import {genreActions} from '../../../_actions'
import moment from 'moment';
import { connect } from 'react-redux';


class ModalAdd extends React.Component {
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
        this.modalAdd = this.props.modalAdd
    }

    handleClose = (modal) => {
        return () => modal.current.handleClose()
    }

    addGenre = (event) => {
        event.preventDefault();
        const {genre} = this.state
        console.log("genre: ", genre)
        this.props.addGenre(genre)
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
    }
  
    render() {
        return (
            <CommonModal ref={this.modalAdd}>
                    <form onSubmit={this.addGenre}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Add Genre</h4>
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
                            <label>Country</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="country"
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
                            />
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
    return {}
}
const actionCreators = {
    addGenre: genreActions.add
}

const connectedModalAdd = connect(mapState, actionCreators)(ModalAdd);
export { connectedModalAdd as ModalAdd };