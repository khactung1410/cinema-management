import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import {scheduleActions} from '../../../_actions'
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import DatePicker from 'react-datepicker';

class ModalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: {
                ticketPrice: ''
            },
            startAt: '',
            endAt: '',
            date: '',
            selectedMovie: '',
            selectedRoom: '',
            allMovies: []
        }
        this.modalEdit = this.props.modalEdit
    }

    componentDidUpdate(prevProps) {
        const id = this.props.idEditting
        if ((id && (id !== prevProps.idEditting))) {
            const schedule = this.props.schedules.schedule ? this.props.schedules.schedule[0] : null
            console.log("hú: ", schedule)
            if(schedule) {
                this.setState({
                    schedule: {
                        ticketPrice: schedule.ticketPrice
                    },
                    startAt: new Date('2019-12-26'+' '+schedule.startAt),
                    endAt: new Date('2019-12-26'+' '+schedule.endAt),
                    date: new Date(schedule.date+' '+schedule.endAt),
                    selectedMovie: {
                        value: schedule.idMovie,
                        label: schedule.name
                    },
                    selectedRoom: {
                        value: schedule.idRoom, 
                        label: schedule.room
                    },
                    allMovies: []
                })
            }
        }
    }

    handleClose = (modal) => {
        return () => {
            const schedule = this.props.schedules.schedule ? this.props.schedules.schedule[0] : null
            this.setState({
                schedule: {
                    ticketPrice: schedule.ticketPrice
                },
                startAt: new Date('2019-12-26'+' '+schedule.startAt),
                endAt: new Date('2019-12-26'+' '+schedule.endAt),
                date: new Date(schedule.date+' '+schedule.endAt),
                selectedMovie: {value: schedule.idMovie, label: schedule.name},
                selectedRoom: {value: schedule.idRoom, label: schedule.room},
                allMovies: []
            })
            modal.current.handleClose()
        }
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
        setTimeout(()=>{console.log(this.state.movie)},500)
    }

    editSchedule = (event) => {
        event.preventDefault();
        const id = this.props.idEditting
        const edittingSchedule = {
            id: id,
            name: this.state.selectedMovie.label,
            idMovie: this.state.selectedMovie.value,
            room: this.state.selectedRoom.label,
            idRoom: this.state.selectedRoom.value,
            startAt: moment(this.state.startAt).format('HH:mm:ss'),
            endAt: moment(this.state.endAt).format('HH:mm:ss'),
            date: moment(this.state.date).format("YYYY-MM-DD"),
            ticketPrice: this.state.schedule.ticketPrice
        }
        this.props.editSchedule(edittingSchedule)
    }

    handleSelectMovie = (movie) => {
        console.log("tung", movie)
        this.setState({
            selectedMovie: movie
        })
    }
    handleSelectRoom = (room) => {
        console.log("tung", room)
        this.setState({
            selectedRoom: room
        })
    }
    

    handleStartAtChange = (startAt) => {
        console.log("start at : ", startAt); 
        this.setState({
            startAt: startAt
        });
    }

    handleEndAtChange = (endAt) => {
        console.log("end at : ", endAt);
        this.setState({
            endAt: endAt 
        });
    }

    handleDateChange = (date) => {
        console.log("date  : ",date)
        this.setState({
            date: date
        });
    }
  
    render() {
        var optionsMovie = []
        var optionsRoom = []
        this.props.movies.items?this.props.movies.items.allMovies.map(movie => {
            optionsMovie.push({
                value: movie.id,
                label: movie.name
            })
        }):""
        this.props.rooms.items?this.props.rooms.items.allRoom.map(room => {
            optionsRoom.push({
                value: room.id,
                label: room.name
            })
        }):""
        console.log(optionsMovie)
        console.log(optionsRoom)
        return (
            <CommonModal ref={this.modalEdit}>
                    <form onSubmit={this.editSchedule}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Edit Schedule</h4>
                            <button type="button" className="close" onClick={this.handleClose(this.modalEdit)}>×</button>
                        </div>
                        <div className="modal-body">                    
                        <div className="form-group">
                            <label>Name of movie</label>
                            <Select
                                name = "selectedMovie"
                                value={this.state.selectedMovie}
                                onChange={this.handleSelectMovie}
                                options={optionsMovie}
                                // defaultInputValue={this.state.selectedMovie}
                            />
                        </div>
                        <div className="form-group">
                            <label>Room</label>
                            <Select
                                name = "selectedRoom"
                                value={this.state.selectedRoom}
                                onChange={this.handleSelectRoom}
                                options={optionsRoom}
                                // defaultInputValue={this.state.selectedRoom}
                            />
                        </div>
                        <div className="form-group">
                            <label>Start At</label>
                            <div className="customDatePickerWidth">
                                <DatePicker
                                    className="form-control" 
                                    selected={this.state.startAt}
                                    onChange={this.handleStartAtChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>End At</label>
                            <div className="customDatePickerWidth">
                                <DatePicker
                                    className="form-control" 
                                    selected={this.state.endAt}
                                    onChange={this.handleEndAtChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <div className="customDatePickerWidth">
                                <DatePicker
                                    className="form-control" 
                                    onChange={this.handleDateChange} 
                                    selected={this.state.date} 
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="text"
                                className="form-control" 
                                required
                                onChange={this.handleChange}
                                name="ticketPrice"
                                value={this.state.schedule.ticketPrice}
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
    const {schedules, movies, rooms} = state
    return {schedules, movies, rooms}
}
const actionCreators = {
    editSchedule: scheduleActions.edit
}

const connectedModalEdit = connect(mapState, actionCreators)(ModalEdit);
export { connectedModalEdit as ModalEdit };