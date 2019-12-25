import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var role = JSON.parse(localStorage.getItem('user')).text.role
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                {
                    role !== 'Customer'?
                    <button className="btn btn-primary" id="menu-toggle" onClick={this.props.handleToggleMenu}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    :
                    <div className="sidebar-heading">CINEMA</div>
                }
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <span className="nav-link" href="/"><i>Welcome {JSON.parse(localStorage.getItem('user')).text.role} {JSON.parse(localStorage.getItem('user')).text.fullname} </i></span>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">HOME </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/login">LOG OUT</a> {/*Call Logout action in LoginPage Component*/}
                    </li>
                </ul>
                </div>
            </nav>
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

const connectedHeaderMenu = connect(mapState, actionCreators)(HeaderMenu);
export { connectedHeaderMenu as HeaderMenu };