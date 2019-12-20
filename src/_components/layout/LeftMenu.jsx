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
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">CINEMA MANAGEMENT</div>
                <div className="list-group list-group-flush">
                    <NavLink to="/UserManagement" className="list-group-item list-group-item-action">Users Management</NavLink>
                    <NavLink to="/RoomManagement" className="list-group-item list-group-item-action">Room Management</NavLink>
                    <NavLink to="/GenreManagement" className="list-group-item list-group-item-action">Genre Management</NavLink>
                    <NavLink to="/MovieManagement" className="list-group-item list-group-item-action">Movie Management</NavLink>
                    <NavLink to="/MovieSchedule" className="list-group-item list-group-item-action">Movie Schedule</NavLink>
                    <NavLink to="/SellTicket" className="list-group-item list-group-item-action">Sell Ticket</NavLink>
                    <NavLink to="/Statics" className="list-group-item list-group-item-action">Statistics</NavLink>
                </div>
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