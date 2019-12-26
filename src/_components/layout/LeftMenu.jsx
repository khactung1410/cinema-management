import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

class LeftMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: true
        }
    }
    componentDidMount() {
        // this.props.getUsers();
    }

    handleDeleteUser(id) {
        // return (e) => this.props.deleteUser(id);
    }
    
    handleToggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    render() {
        var role = JSON.parse(localStorage.getItem('user')).text.role
        return (
            <div>
                {
                    role !== 'Customer'?
                    <div>
                        <div className="bg-light border-right" id="sidebar-wrapper">
                            <div className="sidebar-heading">CINEMA MANAGEMENT</div>
                            <div className="list-group list-group-flush">
                                {
                                    (role == 'Admin')?
                                    <div>
                                        <NavLink to="/UserManagement" className="list-group-item list-group-item-action">User Management</NavLink>
                                    </div>
                                    :null
                                }
                                {
                                    (role == 'Admin'||role == 'Room Management Employee')?
                                    <div>
                                        <NavLink to="/RoomManagement" className="list-group-item list-group-item-action">Room Management</NavLink>
                                    </div>
                                    :null
                                }
                                {
                                    (role=='Admin'||role=='Movie Management Employee')?
                                    <div>
                                        <NavLink to="/MovieManagement" className="list-group-item list-group-item-action">Movie Management</NavLink>
                                        <NavLink to="/GenreManagement" className="list-group-item list-group-item-action">Genre Management</NavLink>
                                    </div>
                                    :
                                    null
                                }
                                {
                                    (role=='Admin'||role=='Schedule Management Employee')?<NavLink to="/MovieSchedule" className="list-group-item list-group-item-action">Movie Schedule</NavLink>:null
                                }
                                {
                                    (role=='Admin'||role=='Ticket Management Employee')?<NavLink to="/SellTicket" className="list-group-item list-group-item-action">Sell Ticket</NavLink>:null
                                }
                                {
                                    role=='Admin'?<NavLink to="/Statics" className="list-group-item list-group-item-action">Statistics</NavLink>:null
                                }
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedLeftMenu = connect(mapState, actionCreators)(LeftMenu);
export { connectedLeftMenu as LeftMenu };