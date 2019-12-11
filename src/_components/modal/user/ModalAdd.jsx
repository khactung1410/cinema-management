import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal } from '../modal';
import { timingSafeEqual } from 'crypto';
import {userActions} from '../../../_actions';
import Select from 'react-select';
import { connect } from 'react-redux';


class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                fullname: '',
                address: '',
                phone: '',
                username: '',
                password: ''
            },
            role:''
        }
        this.modalAdd = this.props.modalAdd
    }

    handleClose = (modal) => {
        return () => modal.current.handleClose()
    }

    addUser = (event) => {
        event.preventDefault();
        const {user} = this.state
        user.role = this.state.role.value
        console.log(user)
        this.props.addUser(user)
    }
    handleSelectRole = (role) => {
        this.setState({
            role: role
        })
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
            {value: 'Movie Employee', label: 'Movie Management Employee'},
            {value: 'Customer', label: 'Customer'},
        ]
        return (
            <CommonModal ref={this.modalAdd}>
                    <form onSubmit={this.addUser}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Add User</h4>
                            <button type="button" className="close" onClick={this.handleClose(this.modalAdd)}>×</button>
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
                            />
                        </div>	
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                required 
                                onChange={this.handleChange}
                                name="password"
                            />
                        </div>	
                        <div className="form-group">
                            <label>Role of user</label>
                            <Select
                                name = "selectedRole"
                                value={this.state.role}
                                onChange={this.handleSelectRole}
                                options={optionsRole}
                                defaultInputValue={this.state.role}
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
    return {}
}
const actionCreators = {
    addUser: userActions.register
}

const connectedModalAdd = connect(mapState, actionCreators)(ModalAdd);
export { connectedModalAdd as ModalAdd };