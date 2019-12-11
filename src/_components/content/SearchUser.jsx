import React from 'react';
import { connect } from 'react-redux';
import {userActions} from '../../_actions'

class SearchUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        // this.setState({
        //     [name]: value
        // })
        this.props.searchUserByName(value, 1)
    } 

    render() {
        return (
            <div className="search-box">
                <div className="input-group">								
                    <input type="text" id="search" className="form-control" placeholder="Search by Name" name='name' onChange={this.handleChange}/>
                    <span className="input-group-addon"><i className="material-icons"></i></span>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const {users}  = state;
    return {users};
}

const actionCreators = {
    searchUserByName: userActions.searchByName
}

const connectedSearchUser = connect(mapState, actionCreators)(SearchUser);
export { connectedSearchUser as SearchUser };