import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import { timingSafeEqual } from 'crypto';
import {roomActions} from '../../../_actions'
import moment from 'moment';
import { connect } from 'react-redux';


class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            room: {
                name: '',
                totalSeat: '',
                square: '',
                location: '',
                typeRoom: '',
            },
            createAt: new Date(),
            updateAt: new Date()
        }
        this.modalAdd = this.props.modalAdd
    }

    handleClose = (modal) => {
        return () => modal.current.handleClose()
    }

    addRoom = (event) => {
        event.preventDefault();
        const {room} = this.state
        room.createAt = moment(this.state.createAt).format("YYYY-MM-DD HH:mm:ss")
        room.updateAt = moment(this.state.updateAt).format("YYYY-MM-DD HH:mm:ss")
        console.log("room: ", room)
        this.props.addRoom(room)
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        const {room} = this.state
        this.setState({
            room: {
                ...room,
                [name]: value
            }
        })
    }
  
    render() {
        return (
            <CommonModal ref={this.modalAdd}>
                    <form onSubmit={this.addRoom}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Add Room</h4>
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
                            <label>Total Seat</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="totalSeat"
                            />
                        </div>
                        <div className="form-group">
                            <label>Square (m<sup>2</sup>)</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="square"
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name= "location"
                            />
                        </div>
                        <div className="form-group">
                            <label>Type Room</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name= "typeRoom"
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
    addRoom: roomActions.add
}

const connectedModalAdd = connect(mapState, actionCreators)(ModalAdd);
export { connectedModalAdd as ModalAdd };