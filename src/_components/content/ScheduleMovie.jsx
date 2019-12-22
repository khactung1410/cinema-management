import React from 'react';
import { connect } from 'react-redux';
import { CommonModal } from '../modal/modal';
import {ModalAdd} from '../modal/schedule/ModalAdd'
import {ModalEdit} from '../modal/schedule/ModalEdit'
import {ModalDeleteSingle} from '../modal/schedule/ModalDeleteSingle'
import {ModalDeleteMultiple} from '../modal/movie/ModalDeleteMultiple'
import _ from 'lodash'
import {scheduleActions} from '../../_actions'
import {roomActions} from '../../_actions'
import {movieActions} from '../../_actions'
import { SearchSchedule } from './SearchSchedule';

class ScheduleMovie extends React.Component {
    constructor(props) {
        super(props)
        this.modalAdd = React.createRef();
        this.modalEdit = React.createRef();
        this.modalDeleteMultiple = React.createRef();
        this.modalDeleteSingle = React.createRef();
        this.state = {
            idDelete: null,
            // idEditting: null
        }
    }

    componentDidMount() {
        this.props.getSchedules(1)
        this.props.getMovies(1)
        this.props.getRooms(1)
    };

    handleShow = (modal,id) => {
        return () => {
            if(id) this.setState({
                        idDelete: id
                    })
            modal.current.handleShow()
        }
    }

    handleShowEdit = (modal,id) => {
        return () => {
            this.props.getScheduleById(id)
            setTimeout(() => this.setState({
                                idEditting: id
                    }),300)
            modal.current.handleShow()
        }
    }

    handleClose = (modal) => {
        return () => modal.current.handleClose()
    }

    changePage = (page, searchingName) => {
        return (e) => {
            e.preventDefault()
            searchingName ? this.props.searchScheduleByName(searchingName,page) : this.props.getSchedules(page)
        }
    }

    handleCheck = (event) => {
        console.log(event.target.value)
    }

    render() {
        const {schedules} = this.props
        return (
            <React.Fragment>
                <ModalAdd modalAdd = {this.modalAdd}/>
                <ModalEdit modalEdit = {this.modalEdit} idEditting={this.state.idEditting}/>
                <ModalDeleteMultiple modalDeleteMultiple = {this.modalDeleteMultiple}/>
                <ModalDeleteSingle modalDeleteSingle = {this.modalDeleteSingle} idDelete={this.state.idDelete}/>
                <div className="col-sm-12">
                    <h3 className="center-text">Movie Schedule</h3>
                </div>
                <div className="table-wrapper">
                    <div className="table-title">
                    <div className="row">
                        <div className="col-sm-4">
                            <SearchSchedule />
                        </div>
                        <div className="col-sm-8">
                            <a className="btn btn-success" onClick={this.handleShow(this.modalAdd)}><i className="material-icons"></i> <span>Add New Schedule</span></a>
                            <a className="btn btn-danger" onClick={this.handleShow(this.modalDeleteMultiple)}><i className="material-icons"></i> <span>Delete</span></a>						
                        </div>
                    </div>
                    </div>
                    <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                        <th>
                            <span className="custom-checkbox">
                            <input type="checkbox" id="selectAll" />
                            <label htmlFor="selectAll" />
                            </span>
                        </th>
                        <th style={{width: 20 + '%'}}>Name</th>
                        <th style={{width: 15 + '%'}}>Room</th>
                        <th style={{width: 15 + '%'}}>Start At</th>
                        <th style={{width: 15 + '%'}}>End At</th>
                        <th style={{width: 15 + '%'}}>Date</th>
                        <th style={{width: 20 + '%'}}>Ticket Price</th>
                        <th >Actions</th>
                        </tr>
                    </thead>
                    {
                        schedules.items &&
                        schedules.items.schedules.map((schedule,key) => (
                                <tbody key={key}>
                                    {
                                        new Date(schedule.date + ' ' +schedule.endAt) <= new Date() ?
                                        <tr style={{backgroundColor: '#ffb3b3'}}>
                                            <td>
                                                <span className="custom-checkbox">
                                                <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1} onClick={this.handleCheck}/>
                                                <label htmlFor="checkbox1" />
                                                </span>
                                            </td>
                                            <td style={{width: 20 + '%'}}>{schedule.name}</td>
                                            <td style={{width: 15 + '%'}}>{schedule.room}</td>
                                            <td style={{width: 15 + '%'}}>{schedule.startAt}</td>
                                            <td style={{width: 15 + '%'}}>{schedule.endAt}</td>
                                            <td style={{width: 15 + '%'}}>{schedule.date}</td>
                                            <td style={{width: 20 + '%'}}>{schedule.ticketPrice}</td>
                                            <td>
                                                <a className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit" onClick={this.handleShowEdit(this.modalEdit, schedule.id)}></i></a>
                                                <a className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete" onClick={this.handleShow(this.modalDeleteSingle, schedule.id)}></i></a>
                                            </td>
                                        </tr>
                                        :
                                        <tr>
                                            <td>
                                                <span className="custom-checkbox">
                                                <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1} onClick={this.handleCheck}/>
                                                <label htmlFor="checkbox1" />
                                                </span>
                                            </td>
                                            <td style={{width: 20 + '%'}}>{schedule.name}</td>
                                            <td style={{width: 15 + '%'}}>{schedule.room}</td>
                                            <td style={{width: 15 + '%'}}>{schedule.startAt}</td>
                                            <td style={{width: 15 + '%'}}>{schedule.endAt}</td>
                                            <td style={{width: 15 + '%'}}>{schedule.date}</td>
                                            <td style={{width: 20 + '%'}}>{schedule.ticketPrice}</td>
                                            <td>
                                                <a className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit" onClick={this.handleShowEdit(this.modalEdit, schedule.id)}></i></a>
                                                <a className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete" onClick={this.handleShow(this.modalDeleteSingle, schedule.id)}></i></a>
                                            </td>
                                        </tr>
                                    }
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
    getScheduleById: scheduleActions.getById,
    searchScheduleByName: scheduleActions.searchByName
}

const connectedScheduleMovie = connect(mapState, actionCreators)(ScheduleMovie);
export { connectedScheduleMovie as ScheduleMovie };