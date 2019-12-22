import React from 'react';
import { connect } from 'react-redux';
import {genreActions} from '../../_actions'

class SearchGenre extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        this.props.searchGenreByName(value, 1)
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
    const {genres}  = state;
    return {genres};
}

const actionCreators = {
    searchGenreByName: genreActions.searchByName
}

const connectedSearchGenre = connect(mapState, actionCreators)(SearchGenre);
export { connectedSearchGenre as SearchGenre };