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
                date: '',
                ticketPrice: ''
            },
            startAt: 0,
            endAt: 0,
        }
        this.modalAdd = this.props.modalAdd
    }

    handleClose = (modal) => {
        return () => modal.current.handleClose()
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
    
    msToTime = (millisec) => {
        var hour = Math.floor(millisec/3600)
        console.log(hour)
        var minute = (millisec - hour*3600)/60
        var second = millisec - hour*3600 - minute*60
        return hour + ":" + minute + ":" + second
    }

    handleStartAtChange = (startAt) => {
        console.log(startAt); 
        this.setState({
            startAt: startAt
        });
    }

    handleEndAtChange = (endAt) => {
        console.log(endAt);
        this.setState({
            endAt: endAt 
        });
    }

    addSchedule = (event) => {
        event.preventDefault();
        const {schedule} = this.state
        schedule.startAt = this.msToTime(this.state.startAt)
        schedule.endAt = this.msToTime(this.state.endAt)
        console.log(schedule)
        this.props.addSchedule(schedule)
    }
  
    render() {
        return (
            <CommonModal ref={this.modalAdd}>
                    <form onSubmit={this.addSchedule}>
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
                            <TimePicker format={24} onChange={this.handleStartAtChange} value={this.state.startAt}/>
                        </div>
                        <div className="form-group">
                            <label>End At</label>
                            <TimePicker format={24}  onChange={this.handleEndAtChange} value={this.state.endAt}/>
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
                                name="ticketPrice"
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
