import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import { timingSafeEqual } from 'crypto';
import {userActions} from '../../../_actions';
import Select from 'react-select';
import { connect } from 'react-redux';


class ModalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                fullname: '',
                address: '',
                phone: '',
                username: '',
                // password: ''
            },
            role:''
        }
        this.modalEdit = this.props.modalEdit
    }

    componentDidUpdate(prevProps) {
        const id = this.props.idEditting
        if ((id && (id !== prevProps.idEditting))) {
            const user = this.props.users.user ? this.props.users.user[0] : null
            if(user) {
                this.setState({
                    user: {
                        fullname: user.fullname,
                        address: user.address,
                        phone: user.phone,
                        username: user.username,
                        // password: user.password
                    },
                    role: {value: user.role, label: user.role}
                })
            }
            setTimeout(()=>console.log(this.state), 200)

        }
    }

    handleClose = (modal) => {
        return () => {
            const user = this.props.users.user ? this.props.users.user[0] : null
            this.setState({
                user: {
                    fullname: user.fullname,
                    address: user.address,
                    phone: user.phone,
                    username: user.username,
                    // password: user.password
                },
                role: user.role
            })
            modal.current.handleClose()
        }
    }

    editUser = (event) => {
        event.preventDefault();
        const id = this.props.idEditting
        const {user} = this.state
        console.log("u editiing: ", user)
        const edittingUser = {
            ...user,
            id: id,
            role: this.state.role.value
        }
        this.props.editUser(edittingUser)
    }
    handleSelectRole = (role) => {
        this.setState({
            role: role
        })
        console.log(this.state.role)
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        const {user} = this.state
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        })
    }
  
    render() {
        const optionsRole = [
            {value: 'Movie Management Employee', label: 'Movie Management Employee'},
            {value: 'Ticket Management Employee', label: 'Ticket Management Employee'},
            {value: 'Schedule Management Employee', label: 'Schedule Management Employee'},
            {value: 'Room Management Employee', label: 'Room Management Employee'},
            {value: 'Customer', label: 'Customer'}
        ]
        return (
            <CommonModal ref={this.modalEdit}>
                    <form onSubmit={this.editUser}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Edit User</h4>
                            <button type="button" className="close" onClick={this.handleClose(this.modalEdit)}>×</button>
                        </div>
                        <div className="modal-body">					
                        <div className="form-group">
                            <label>FullName</label>
                            <input
                                type="text"
                                className="form-control" 
                                required
                                onChange={this.handleChange}
                                name="fullname"
                                value={this.state.user.fullname}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="address"
                                value={this.state.user.address}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="phone"
                                value={this.state.user.phone}
                            />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="username"
                                value={this.state.user.username}
                            />
                        </div>	
                        {/* <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="password"
                                value={this.state.user.password}
                            />
                        </div>	 */}
                        <div className="form-group">
                            <label>Role of user</label>
                            <Select
                                name = "selectedRole"
                                value={this.state.role}
                                onChange={this.handleSelectRole}
                                options={optionsRole}
                                // defaultInputValue={this.state.role}
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
    const {users} = state
    return {users}
}
const actionCreators = {
    getUserById: userActions.getById,
    editUser: userActions.edit
}

const connectedModalEdit = connect(mapState, actionCreators)(ModalEdit);
export { connectedModalEdit as ModalEdit };