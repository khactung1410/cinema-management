import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import {scheduleActions} from '../../_actions'
import {roomActions} from '../../_actions'
import {seatActions} from '../../_actions'
import {movieActions} from '../../_actions'
import {seatStatusActions} from '../../_actions'
import { SearchSchedule } from './SearchSchedule';
import Select from 'react-select';
import { Link, NavLink } from 'react-router-dom';
import { PickSeat } from './PickSeat';

class SellTicket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idDelete: null,
            displayPickSeat: false,
            sellingTicket: null
        }
    }

    componentDidMount() {
        this.props.getSchedules(1)
        this.props.getMovies(1)
        this.props.getRooms()
    };

    changePage = (page, searchingName) => {
        return (e) => {
            e.preventDefault()
            searchingName ? this.props.searchScheduleByName(searchingName,page) : this.props.getSchedules(page)
        }
    }

    displayPickSeat = (schedule) => {
        return () => {
            this.props.getSeatStatus(schedule)
            this.props.getSeatByRoom(schedule.idRoom)
            this.setState({
                displayPickSeat: true,
                sellingTicket: schedule
            })

        }
    }

    render() {
        console.log(this.state.displayPickSeat)
        const {schedules} = this.props
        var optionStartTime = []
        if(schedules.items) {
            schedules.items.schedules.map(schedule => {
                optionStartTime.push({
                    label: schedule.startAt,
                    value: schedule.startAt
                })
            })
        }
        
        return (
            <React.Fragment>
                <div className="col-sm-12">
                    <h3 className="center-text">Sell Ticket</h3>
                </div>
                {
                    this.state.displayPickSeat?
                    <PickSeat sellingTicket={this.state.sellingTicket}/>
                    :
                    <div>
                        <div className="col-sm-3" >
                            <p>Pick Date Time : </p>
                                    <Select
                                        name = "selectedStartTime"
                                        // value={optionStartTime}
                                        // onChange={this.handleSelectRoom}
                                        options={optionStartTime}
                                        // defaultInputValue={this.state.selectedRoom}
                                    />
                                </div>
                        <div className="table-wrapper">
                            <div className="table-title" style={{height: "65px"}}>
                            <div className="row">
                                <div className="col-sm-3">
                                    <SearchSchedule />
                                </div>
                            </div>
                            </div>
                            <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th style={{width: 15 + '%'}}>Name</th>
                                    <th style={{width: 10 + '%'}}>Room</th>
                                    <th style={{width: 10 + '%'}}>Start At</th>
                                    <th style={{width: 10 + '%'}}>End At</th>
                                    <th style={{width: 10 + '%'}}>Date</th>
                                    <th style={{width: 10 + '%'}}>Ticket Price</th>
                                    <th style={{width: 10 + '%'}}>Remaining Ticket</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            {
                                schedules.items &&
                                schedules.items.schedules.map((schedule,key) => (
                                        <tbody key={key}>
                                        <tr>
                                            <td style={{width: 15 + '%'}}>{schedule.name}</td>
                                            <td style={{width: 10 + '%'}}>{schedule.room}</td>
                                            <td style={{width: 10 + '%'}}>{schedule.startAt}</td>
                                            <td style={{width: 10 + '%'}}>{schedule.endAt}</td>
                                            <td style={{width: 10 + '%'}}>{schedule.date}</td>
                                            <td style={{width: 10 + '%'}}>{schedule.ticketPrice}</td>
                                            <td style={{width: 10 + '%'}}>{schedule.remainingTicket}/{schedule.remainingTicket}</td>
                                            <td>
                                            {/* <Link to="/PickSeat"><button type="button" class="btn btn-outline-success">Sell Ticket</button></Link> */}
                                            <button type="button" onClick={this.displayPickSeat(schedule)} className="btn btn-outline-success">Sell Ticket</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    ))
                            }
                            </table>
                            {schedules.items &&
                                <div className="clearfix">
                                <div className="hint-text">Showing <b>{schedules.items.schedules.length}</b> out of <b>{schedules.items.total}</b> items</div>
                                <ul className="pagination">
                                    <li className="page-item" onClick={schedules.items.searchingName ? this.changePage((schedules.items.current_page>1)?schedules.items.current_page-1:1, schedules.items.searchingName): this.changePage((schedules.items.current_page>1)?schedules.items.current_page-1:1)}><a href="#" className="page-link">Previous</a></li>
                                    {
                                        _.times(schedules.items.total_page, (key) => (<li key={key} className={(schedules.items.current_page == key+1)?"page-item active":"page-item"} onClick={schedules.items.searchingName ? this.changePage(key+1, schedules.items.searchingName) : this.changePage(key+1)}><a href="#" className="page-link">{key+1}</a></li>))
                                    }
                                    <li className="page-item" onClick={schedules.items.searchingName ? (this.changePage((schedules.items.current_page < schedules.items.total_page)?schedules.items.current_page+1:schedules.items.total_page, schedules.items.searchingName)) : this.changePage((schedules.items.current_page < schedules.items.total_page)?schedules.items.current_page+1:schedules.items.total_page)}><a href="#" className="page-link" disabled={false}>Next</a></li>
                                </ul>
                                </div>
                            }
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

function mapState(state) {
    const {schedules, movies, rooms}  = state;
    return {schedules, movies, rooms};
}

const actionCreators = {
    getMovies: movieActions.getAll,
    getSchedules: scheduleActions.getAll,
    getRooms: roomActions.getAll,
    getSeatStatus: seatStatusActions.getBySchedule,
    getSeatByRoom: seatActions.getByRoom
}

const connectedSellTicket = connect(mapState, actionCreators)(SellTicket);
export { connectedSellTicket as SellTicket };