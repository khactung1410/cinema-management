import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import '../style.css'
import { LeftMenu } from '../_components/layout/LeftMenu';
import { HeaderMenu } from '../_components/layout/HeaderMenu';

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="mt-4">Our services make you satisfied!</h1>
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

const connectedHome = connect(mapState, actionCreators)(Home);
export { connectedHome as Home };