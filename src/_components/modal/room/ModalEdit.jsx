import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import { timingSafeEqual } from 'crypto';
import {roomActions} from '../../../_actions'
import moment from 'moment';
import { connect } from 'react-redux';


class ModalEdit extends React.Component {
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
        this.modalEdit = this.props.modalEdit
    }

    componentDidUpdate(prevProps) {
        const id = this.props.idEditting
        if ((id && (id !== prevProps.idEditting))) {
            const room = this.props.rooms.room ? this.props.rooms.room[0] : null
            if(room) {
                this.setState({
                    room: {
                        name: room.name,
                        totalSeat: room.totalSeat,
                        square: room.square,
                        location: room.location,
                        typeRoom: room.typeRoom
                    }
                })
            }
        }
    }

    handleClose = (modal) => {
        return () => {
            const room = this.props.rooms.room ? this.props.rooms.room[0] : null
            this.setState({
                room: {
                    name: room.name,
                    totalSeat: room.totalSeat,
                    square: room.square,
                    location: room.location,
                    typeRoom: room.typeRoom
                }
            })
            modal.current.handleClose()
        }
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
        // setTimeout(()=>{console.log(this.state.room)},500)
    }

    editRoom = (event) => {
        event.preventDefault();
        const id = this.props.idEditting
        const {room} = this.state
        const edittingRoom = {
            ...room,
            id: id,
            updateAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        }
        console.log(edittingRoom)
        this.props.editRoom(edittingRoom)
    }
  
    render() {
        return (
            <CommonModal ref={this.modalEdit}>
                    <form onSubmit={this.editRoom}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Edit Room</h4>
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
                                value={this.state.room.name}
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
                                value={this.state.room.totalSeat}
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
                                value={this.state.room.square}
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
                                value={this.state.room.location}
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
                                value={this.state.room.typeRoom}
                            />
                        </div>				
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" defaultValue="Cancel" onClick={this.handleClose(this.modalEdit)} />
                            <input type="submit" className="btn btn-success" value="Edit"/>
                        </div>
                    </form>
                </CommonModal> 
        );
    }
}

function mapState(state) {
    const {rooms} = state
    return {rooms}
}
const actionCreators = {
    editRoom: roomActions.edit
}

const connectedModalEdit = connect(mapState, actionCreators)(ModalEdit);
export { connectedModalEdit as ModalEdit };