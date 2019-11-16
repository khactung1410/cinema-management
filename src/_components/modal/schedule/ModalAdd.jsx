import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import { timingSafeEqual } from 'crypto';
import {scheduleActions} from '../../../_actions'
import { connect } from 'react-redux';
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePickerWidth.css";
import Select from 'react-select';

class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: {
                room: '',
                ticketPrice: ''
            },
            startAt: new Date(),
            endAt: new Date(),
            date: new Date(),
            selectedMovie: '',
            allMovies: []
        }
        this.modalAdd = this.props.modalAdd
    }

    componentDidMount() {
        console.log(this.props.movies)
    }
    
    handleClose = (modal) => {
        return () => {
            this.setState({selectedMovie: ''})
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
    }

    handleSelect = (movie) => {
        console.log("tung", movie)
        this.setState({
            selectedMovie: movie
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


    addSchedule = (event) => {
        event.preventDefault();
        const {schedule} = this.state
        schedule.startAt = moment(this.state.startAt).format("hh:mm:ss")
        schedule.endAt = moment(this.state.endAt).format("hh:mm:ss")
        schedule.date = moment(this.state.date).format("YYYY-MM-DD")
        schedule.name = this.state.selectedMovie.label
        schedule.idMovie = this.state.selectedMovie.value
        console.log(schedule)
        this.props.addSchedule(schedule)
    }

    handleDateChange = (date) => {
        console.log("date  : ",date)
        this.setState({
            date: date
        });
    }
  
    render() {
        var options = []
        this.props.movies.items?this.props.movies.items.allMovies.map(movie => {
            options.push({
                value: movie.id,
                label: movie.name
            })
        }):""
        console.log(options)
        return (
            <CommonModal ref={this.modalAdd}>
                    <form onSubmit={this.addSchedule}>
                        <div className="modal-header">                      
                            <h4 className="modal-title">Add Schedule</h4>
                            <button type="button" className="close" onClick={this.handleClose(this.modalAdd)}>×</button>
                        </div>
                        <div className="modal-body">                    
                        <div className="form-group">
                            <label>Name of movie</label>
                            {/* <input
                                type="text"
                                className="form-control" 
                                required
                                onChange={this.handleChange}
                                name="name"
                            /> */}
                            <Select
                                name = "selectedMovie"
                                value={this.state.selectedMovie}
                                onChange={this.handleSelect}
                                options={options}
                                defaultInputValue={this.state.selectedMovie}
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
    const {schedules, movies} = state
    return {
        schedules,
        movies
    }
}
const actionCreators = {
    addSchedule: scheduleActions.add
}

const connectedModalAdd = connect(mapState, actionCreators)(ModalAdd);
export { connectedModalAdd as ModalAdd };
