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
    }

    componentDidMount() {
        this.props.getMovies(1)
    }

    render() {
        console.log(this.props.movies)
        return (
            <div className="container">
                <div className="row">
                    {this.props.movies.items && this.props.movies.items.movies.map((x, i) =>
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
    getMovies: movieActions.getAll
}

const connectedHome = connect(mapState, actionCreators)(Home);
export { connectedHome as Home };