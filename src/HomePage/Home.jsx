import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import '../style.css'

class Home extends React.Component {
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
        const { user, users } = this.props;
        const showMenu = this.state.showMenu ? "" : "toggled"
        return (
            <div className={"d-flex " + showMenu} id="wrapper">
                <div className="bg-light border-right" id="sidebar-wrapper">
                    <div className="sidebar-heading">CINEMA MANAGEMENT</div>
                    <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item list-group-item-action bg-light">Movie Management</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Movie Schedule</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Edit Movie Schedule</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Sell Ticket</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Return ticket</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Statistics</a>
                    </div>
                </div>
                <div id="page-content-wrapper">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        <button className="btn btn-info" id="menu-toggle" onClick={this.handleToggleMenu}><span class="navbar-toggler-icon"></span></button>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                            </li>
                        </ul>
                        </div>
                    </nav>

                    <div className="container-fluid">
                        <h1 className="mt-4">Our services make you satisfied!</h1>
                    </div>
                </div>
            </div>

        );
    }
}

function mapState(state) {
    // const { users, authentication } = state;
    // const { user } = authentication;
    // return { user, users };
}

const actionCreators = {
    // getUsers: userActions.getAll,
    // deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(Home);
export { connectedHomePage as Home };