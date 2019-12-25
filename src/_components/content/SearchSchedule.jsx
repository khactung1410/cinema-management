import React from 'react';
import { connect } from 'react-redux';
import {scheduleActions} from '../../_actions'

class SearchSchedule extends React.Component {
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
        this.props.searchScheduleByName(value, 1)
    } 

    render() {
        return (
                <div className="search-box">
                    <div className="input-group">								
                        <input type="text" id="search" className="form-control" placeholder="Search by Name, Date Time" name='name' onChange={this.handleChange}/>
                        <span className="input-group-addon"><i className="material-icons"></i></span>
                    </div>
                </div>
        );
    }
}

function mapState(state) {
    const {schedules}  = state;
    return {schedules};
}

const actionCreators = {
    searchScheduleByName: scheduleActions.searchByName
}

const connectedSearchSchedule = connect(mapState, actionCreators)(SearchSchedule);
export { connectedSearchSchedule as SearchSchedule };