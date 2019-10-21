import React from 'react';
import { Link } from 'react-router-dom';
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
                    <a href="MovieManagement" className="list-group-item list-group-item-action bg-light">Movie Management</a>
                    <a href="MovieSchedule" className="list-group-item list-group-item-action bg-light">Movie Schedule</a>
                    <a href="EditMovieSchedule" className="list-group-item list-group-item-action bg-light">Edit Movie Schedule</a>
                    <a href="SellTicket" className="list-group-item list-group-item-action bg-light">Sell Ticket</a>
                    <a href="ReturnTicket" className="list-group-item list-group-item-action bg-light">Return ticket</a>
                    <a href="Statics" className="list-group-item list-group-item-action bg-light">Statistics</a>
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