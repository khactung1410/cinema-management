import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import '../style.css'

class Test extends React.Component {
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
            <div className="container-fluid">
                <h1 className="mt-4">Our services make you satisfied!</h1>
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

const connectedHomePage = connect(mapState, actionCreators)(Test);
export { connectedHomePage as Test };