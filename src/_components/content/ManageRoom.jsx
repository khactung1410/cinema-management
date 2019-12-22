import React from 'react';
import { connect } from 'react-redux';
import { CommonModal } from '../modal/modal';
import {ModalAdd} from '../modal/room/ModalAdd'
import {ModalEdit} from '../modal/room/ModalEdit'
import {ModalDeleteSingle} from '../modal/room/ModalDeleteSingle'
import {ModalDeleteMultiple} from '../modal/movie/ModalDeleteMultiple'
import {roomActions} from '../../_actions'
import _ from 'lodash'
import { SearchRoom } from './SearchRoom';

class ManageRoom extends React.Component {
    constructor(props) {
        super(props)
        this.modalAdd = React.createRef();
        this.modalEdit = React.createRef();
        this.modalDeleteMultiple = React.createRef();
        this.modalDeleteSingle = React.createRef();
        this.state = {
            idDelete: null,
            idEditting: null
        }
    }

    componentDidMount() {
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

    handleShowEdit = (modal, id) => {
        return () => {
            this.props.getRoomById(id)
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
            searchingName ? this.props.searchRoomByName(searchingName,page) : this.props.getRooms(page)
        }
    }

    handleCheck = (event) => {
        console.log(event.target.value)
    }

    render() {
        const {rooms} = this.props
        console.log("rooms", rooms)
        return (
            <React.Fragment>
                <ModalAdd modalAdd = {this.modalAdd}/>
                <ModalEdit modalEdit = {this.modalEdit} idEditting={this.state.idEditting}/>
                <ModalDeleteMultiple modalDeleteMultiple = {this.modalDeleteMultiple}/>
                <ModalDeleteSingle modalDeleteSingle = {this.modalDeleteSingle} idDelete={this.state.idDelete}/>
                <div className="col-sm-12">
                    <h3 className="center-text">Room Management</h3>
                </div>
                <div className="table-wrapper">
                    <div className="table-title">
                    <div className="row">
                        <div className="col-sm-4">
                            <SearchRoom />
                        </div>
                        <div className="col-sm-8">
                            <a className="btn btn-success" onClick={this.handleShow(this.modalAdd)}><i className="material-icons"></i> <span>Add New Room</span></a>
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
                        <th style={{width: 8 + '%'}}>Name</th>
                        <th style={{width: 8 + '%'}}>Total Seat</th>
                        <th style={{width: 8 + '%'}}>Square (m<sup>2</sup>)</th>
                        <th style={{width: 21 + '%'}}>Location</th>
                        <th style={{width: 10 + '%'}}>Type Room</th>
                        <th style={{width: 10 + '%'}}>Create At</th>
                        <th style={{width: 10 + '%'}}>Update At</th>
                        <th >Actions</th>
                        </tr>
                    </thead>
                    {
                        rooms.items &&
                            rooms.items.rooms.map((room,key) => (
                                <tbody key={key}>
                                <tr>
                                <td>
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1} onClick={this.handleCheck}/>
                                    <label htmlFor="checkbox1" />
                                    </span>
                                </td>
                                <td style={{width: 8 + '%'}}>{room.name}</td>
                                <td style={{width: 8 + '%'}}>{room.totalSeat}</td>
                                <td style={{width: 8 + '%'}}>{room.square}</td>
                                <td style={{width: 21 + '%'}}>{room.location}</td>
                                <td style={{width: 10 + '%'}}>{room.typeRoom}</td>
                                <td style={{width: 10 + '%'}}>{room.createAt}</td>
                                <td style={{width: 10 + '%'}}>{room.updateAt}</td>
                                <td>
                                    <a className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit" onClick={this.handleShowEdit(this.modalEdit, room.id)}></i></a>
                                    <a className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete" onClick={this.handleShow(this.modalDeleteSingle, room.id)}></i></a>
                                </td>
                                </tr>
                            </tbody>
                            ))
                    }
                    </table>
                    {rooms.items &&
                        <div className="clearfix">
                        <div className="hint-text">Showing <b>{rooms.items.rooms.length}</b> out of <b>{rooms.items.total}</b> items</div>
                        <ul className="pagination">
                            <li className="page-item" onClick={rooms.items.searchingName ? this.changePage((rooms.items.current_page>1)?rooms.items.current_page-1:1, rooms.items.searchingName): this.changePage((rooms.items.current_page>1)?rooms.items.current_page-1:1)}><a href="#" className="page-link">Previous</a></li>
                            {
                                _.times(rooms.items.total_page, (key) => (<li key={key} className={(rooms.items.current_page == key+1)?"page-item active":"page-item"} onClick={rooms.items.searchingName ? this.changePage(key+1, rooms.items.searchingName) : this.changePage(key+1)}><a href="#" className="page-link">{key+1}</a></li>))
                            }
                            <li className="page-item" onClick={rooms.items.searchingName ? (this.changePage((rooms.items.current_page < rooms.items.total_page)?rooms.items.current_page+1:rooms.items.total_page, rooms.items.searchingName)) : this.changePage((rooms.items.current_page < rooms.items.total_page)?rooms.items.current_page+1:rooms.items.total_page)}><a href="#" className="page-link" disabled={false}>Next</a></li>
                        </ul>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

function mapState(state) {
    const {rooms}  = state;
    return {rooms};
}

const actionCreators = {
    getRooms: roomActions.getAll,
    getRoomById: roomActions.getById,
}

const connectedManageRoom = connect(mapState, actionCreators)(ManageRoom);
export { connectedManageRoom as ManageRoom };