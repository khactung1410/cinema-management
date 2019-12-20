import React from 'react';
import { connect } from 'react-redux';
import {roomActions} from '../../_actions'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        this.props.searchRoomByName(value, 1)
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
    const {rooms}  = state;
    return {rooms};
}

const actionCreators = {
    searchRoomByName: roomActions.searchByName
}

const connectedSearch = connect(mapState, actionCreators)(Search);
export { connectedSearch as Search };