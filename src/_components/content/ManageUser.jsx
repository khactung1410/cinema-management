import React from 'react';
import { connect } from 'react-redux';
import { CommonModal } from '../modal/modal';
import {ModalAdd} from '../modal/user/ModalAdd'
import {ModalEdit} from '../modal/user/ModalEdit'
import {ModalDeleteSingle} from '../modal/user/ModalDeleteSingle'
import {ModalDeleteMultiple} from '../modal/movie/ModalDeleteMultiple'
import {userActions} from '../../_actions'
import _ from 'lodash'
import { SearchUser } from './SearchUser';

class ManageUser extends React.Component {
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
        this.props.getUsers(1)
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
            this.props.getUserById(id)
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
            searchingName ? this.props.searchMovieByName(searchingName,page) : this.props.getUsers(page)
        }
    }

    handleCheck = (event) => {
        console.log(event.target.value)
    }

    render() {
        const {users} = this.props
        console.log("users", users)
        return (
            <React.Fragment>
                <ModalAdd modalAdd = {this.modalAdd}/>
                <ModalEdit modalEdit = {this.modalEdit} idEditting={this.state.idEditting}/>
                <ModalDeleteMultiple modalDeleteMultiple = {this.modalDeleteMultiple}/>
                <ModalDeleteSingle modalDeleteSingle = {this.modalDeleteSingle} idDelete={this.state.idDelete}/>
                <div className="col-sm-12">
                    <h3 className="center-text">User Management</h3>
                </div>
                <div className="table-wrapper">
                    <div className="table-title">
                    <div className="row">
                        <div className="col-sm-4">
                            <SearchUser />
                        </div>
                        <div className="col-sm-8">
                            <a className="btn btn-success" onClick={this.handleShow(this.modalAdd)}><i className="material-icons"></i> <span>Add New User</span></a>
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
                        <th style={{width: 15 + '%'}}>User Name</th>
                        <th style={{width: 15 + '%'}}>Full Name</th>
                        <th style={{width: 15 + '%'}}>Role</th>
                        <th style={{width: 15 + '%'}}>Address</th>
                        <th style={{width: 25 + '%'}}>phone</th>
                        <th >Actions</th>
                        </tr>
                    </thead>
                    {
                        users.items &&
                        users.items.users.map((user,key) => (
                                <tbody key={key}>
                                <tr>
                                <td>
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1} onClick={this.handleCheck}/>
                                    <label htmlFor="checkbox1" />
                                    </span>
                                </td>
                                <td style={{width: 15 + '%'}}>{user.username}</td>
                                <td style={{width: 15 + '%'}}>{user.fullname}</td>
                                <td style={{width: 15 + '%'}}>{user.role}</td>
                                <td style={{width: 15 + '%'}}>{user.address}</td>
                                <td style={{width: 25 + '%'}}>{user.phone}</td>
                                <td>
                                    <a className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit" onClick={this.handleShowEdit(this.modalEdit, user.id)}></i></a>
                                    <a className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete" onClick={this.handleShow(this.modalDeleteSingle, user.id)}></i></a>
                                </td>
                                </tr>
                            </tbody>
                            ))
                    }
                    </table>
                    {users.items &&
                        <div className="clearfix">
                        <div className="hint-text">Showing <b>{users.items.users.length}</b> out of <b>{users.items.total}</b> items</div>
                        <ul className="pagination">
                            <li className="page-item" onClick={users.items.searchingName ? this.changePage((users.items.current_page>1)?users.items.current_page-1:1, users.items.searchingName): this.changePage((users.items.current_page>1)?users.items.current_page-1:1)}><a href="#" className="page-link">Previous</a></li>
                            {
                                _.times(users.items.total_page, (key) => (<li key={key} className={(users.items.current_page == key+1)?"page-item active":"page-item"} onClick={users.items.searchingName ? this.changePage(key+1, users.items.searchingName) : this.changePage(key+1)}><a href="#" className="page-link">{key+1}</a></li>))
                            }
                            <li className="page-item" onClick={users.items.searchingName ? (this.changePage((users.items.current_page < users.items.total_page)?users.items.current_page+1:users.items.total_page, users.items.searchingName)) : this.changePage((users.items.current_page < users.items.total_page)?users.items.current_page+1:users.items.total_page)}><a href="#" className="page-link" disabled={false}>Next</a></li>
                        </ul>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

function mapState(state) {
    const {users}  = state;
    return {users};
}

const actionCreators = {
    getUsers: userActions.getAll,
    // getMovies: movieActions.getAll,
    getUserById: userActions.getById,
    // searchMovieByName: movieActions.searchByName
}

const connectedManageUser = connect(mapState, actionCreators)(ManageUser);
export { connectedManageUser as ManageUser };