import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { movieActions } from '../../_actions';
import '../../style.css'
import { LeftMenu } from '../layout/LeftMenu';
import { HeaderMenu } from '../layout/HeaderMenu';
import Movie from '../standalone/Movie';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    componentDidMount() {
        this.props.getMovies(1)
    }

    handleChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        this.props.searchMovieByName(value, 1)
    } 

    render() {
        console.log(this.props.movies)
        return (
            <div className="container">
                <br/>
                    <h2><i>MOVIE SELECTION</i></h2>
                <br/>
                <div>
                    <div className="input-group">
                        <input type="text" className="form-control" name="search" onChange={this.handleChange} placeholder="Search Name, Genre or Director"/>
                        <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" style={{padding: 0}}>
                            <span className="input-group-addon"><i className="material-icons"></i></span>
                        </button>
                        </div>
                    </div>
                </div>
                <br/><br/>
                <div className="row">
                    {this.props.movies.items && this.props.movies.items.allMovies.map((x, i) =>
                        <Movie key={i} {...x} />
                    )}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { movies } = state;
    return { movies };
}

const actionCreators = {
    getMovies: movieActions.getAll,
    searchMovieByName: movieActions.searchByName
}

const connectedHome = connect(mapState, actionCreators)(Home);
export { connectedHome as Home };