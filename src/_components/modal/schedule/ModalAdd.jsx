import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import { timingSafeEqual } from 'crypto';
import {scheduleActions} from '../../../_actions'
import { connect } from 'react-redux';
import TimePicker from 'react-bootstrap-time-picker';


class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: {
                name: '',
                room: '',
                startAt: 0,
                endAt: 0,
                date: '',
                price: ''
            }
        }
        this.modalAdd = this.props.modalAdd
    }

    handleClose = (modal) => {
        return () => modal.current.handleClose()
    }

    addSchedule = (event) => {
        event.preventDefault();
        const {schedule} = this.state
        this.props.addSchedule(schedule)
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        const {schedule} = this.state
        this.setState({
            schedule: {
                ...schedule,
                [name]: value
            }
        })
    }

    handleStartAtChange(startAt) {
        console.log(startAt);     // <- prints "3600" if "01:00" is picked
        this.setState({
            ...schedule,
            startAt:  startAt
        });
    }

    handleEndAtChange(endAt) {
        console.log(endAt);     // <- prints "3600" if "01:00" is picked
        this.setState({
            ...schedule,
             endAt: endAt 
            });
    }
  
    render() {
        return (
            <CommonModal ref={this.modalAdd}>
                    <form onSubmit={this.addMovie}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Add Schedule</h4>
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
                            <label>Room</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="room"
                            />
                        </div>
                        <div className="form-group">
                            <label>Start At</label>
                            <TimePicker onChange={this.handleStartAtChange} value={this.state.startAt}/>
                        </div>
                        <div className="form-group">
                            <label>End At</label>
                            <TimePicker onChange={this.handleEndAtChangele} value={this.state.endAt}/>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="text"
                                className="form-control" 
                                required
                                onChange={this.handleChange}
                                name="date"
                            />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="text"
                                className="form-control" 
                                required
                                onChange={this.handleChange}
                                name="price"
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
    const {schedules} = state
    return {schedules}
}
const actionCreators = {
    addSchedule: scheduleActions.add
}

const connectedModalAdd = connect(mapState, actionCreators)(ModalAdd);
export { connectedModalAdd as ModalAdd };