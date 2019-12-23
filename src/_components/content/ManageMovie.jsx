import React from 'react';
import { connect } from 'react-redux';
import { CommonModal } from '../modal/modal';
import {ModalAdd} from '../modal/movie/ModalAdd'
import {ModalEdit} from '../modal/movie/ModalEdit'
import {ModalDeleteSingle} from '../modal/movie/ModalDeleteSingle'
import {ModalDeleteMultiple} from '../modal/movie/ModalDeleteMultiple'
import {movieActions, genreActions} from '../../_actions'
import _ from 'lodash'
import { SearchMovie } from './SearchMovie';

class ManageMovie extends React.Component {
    constructor(props) {
        super(props)
        this.modalAdd = React.createRef();
        this.modalEdit = React.createRef();
        this.modalDeleteMultiple = React.createRef();
        this.modalDeleteSingle = React.createRef();
        this.state = {
            idDelete: null,
            idEditting: null
        }
    }

    componentDidMount() {
        this.props.getMovies(1)
        this.props.getGenres(1)
    };

    handleShow = (modal,id) => {
        return () => {
            if(id) this.setState({
                        idDelete: id
                    })
            modal.current.handleShow()
        }
    }

    handleShowEdit = (modal, id) => {
        console.log("movie: ", modal)
        return () => {
            this.props.getMovieById(id)
            setTimeout(() => this.setState({
                                idEditting: id
                    }),300)
            modal.current.handleShow()
        }
    }

    handleClose = (modal) => {
        return () => modal.current.handleClose()
    }

    changePage = (page, searchingName) => {
        return (e) => {
            e.preventDefault()
            searchingName ? this.props.searchMovieByName(searchingName,page) : this.props.getMovies(page)
        }
    }

    handleCheck = (event) => {
        console.log(event.target.value)
    }

    render() {
        const {movies} = this.props
        console.log("movies", movies)
        return (
            <React.Fragment>
                <ModalAdd modalAdd = {this.modalAdd}/>
                <ModalEdit modalEdit = {this.modalEdit} idEditting={this.state.idEditting}/>
                <ModalDeleteMultiple modalDeleteMultiple = {this.modalDeleteMultiple}/>
                <ModalDeleteSingle modalDeleteSingle = {this.modalDeleteSingle} idDelete={this.state.idDelete}/>
                <div className="col-sm-12">
                    <h3 className="center-text">Movie Management</h3>
                </div>
                <div className="table-wrapper">
                    <div className="table-title">
                    <div className="row">
                        <div className="col-sm-4">
                            <SearchMovie />
                        </div>
                        <div className="col-sm-8">
                            <a className="btn btn-success" onClick={this.handleShow(this.modalAdd)}><i className="material-icons"></i> <span>Add New Movie</span></a>
                            <a className="btn btn-danger" onClick={this.handleShow(this.modalDeleteMultiple)}><i className="material-icons"></i> <span>Delete</span></a>						
                        </div>
                    </div>
                    </div>
                    <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                        <th>
                            <span className="custom-checkbox">
                            <input type="checkbox" id="selectAll" />
                            <label htmlFor="selectAll" />
                            </span>
                        </th>
                        <th style={{width: 15 + '%'}}>Name</th>
                        <th style={{width: 10 + '%'}}>Genre</th>
                        <th style={{width: 10 + '%'}}>Director</th>
                        <th style={{width: 10 + '%'}}>Public Year</th>
                        <th style={{width: 25 + '%'}}>Description</th>
                        <th style={{width: 10 + '%'}}>Trailer</th>
                        <th >Actions</th>
                        </tr>
                    </thead>
                    {
                        movies.items &&
                            movies.items.movies.map((movie,key) => (
                                <tbody key={key}>
                                <tr>
                                <td>
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1} onClick={this.handleCheck}/>
                                    <label htmlFor="checkbox1" />
                                    </span>
                                </td>
                                <td style={{width: 15 + '%'}}>{movie.name}</td>
                                <td style={{width: 10 + '%'}}>{movie.genre}</td>
                                <td style={{width: 10 + '%'}}>{movie.director}</td>
                                <td style={{width: 10 + '%'}}>{movie.publicYear}</td>
                                <td style={{width: 25 + '%'}}>{movie.description}</td>
                                <td style={{width: 10 + '%'}}>
                                    <a href={movie.trailer} target="blank">Link</a>
                                </td>
                                <td>
                                    <a className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit" onClick={this.handleShowEdit(this.modalEdit, movie.id)}></i></a>
                                    <a className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete" onClick={this.handleShow(this.modalDeleteSingle, movie.id)}></i></a>
                                </td>
                                </tr>
                            </tbody>
                            ))
                    }
                    </table>
                    {movies.items &&
                        <div className="clearfix">
                        <div className="hint-text">Showing <b>{movies.items.movies.length}</b> out of <b>{movies.items.total}</b> items</div>
                        <ul className="pagination">
                            <li className="page-item" onClick={movies.items.searchingName ? this.changePage((movies.items.current_page>1)?movies.items.current_page-1:1, movies.items.searchingName): this.changePage((movies.items.current_page>1)?movies.items.current_page-1:1)}><a href="#" className="page-link">Previous</a></li>
                            {
                                _.times(movies.items.total_page, (key) => (<li key={key} className={(movies.items.current_page == key+1)?"page-item active":"page-item"} onClick={movies.items.searchingName ? this.changePage(key+1, movies.items.searchingName) : this.changePage(key+1)}><a href="#" className="page-link">{key+1}</a></li>))
                            }
                            <li className="page-item" onClick={movies.items.searchingName ? (this.changePage((movies.items.current_page < movies.items.total_page)?movies.items.current_page+1:movies.items.total_page, movies.items.searchingName)) : this.changePage((movies.items.current_page < movies.items.total_page)?movies.items.current_page+1:movies.items.total_page)}><a href="#" className="page-link" disabled={false}>Next</a></li>
                        </ul>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

function mapState(state) {
    const {movies}  = state;
    return {movies};
}

const actionCreators = {
    getMovies: movieActions.getAll,
    getGenres: genreActions.getAll,
    getMovieById: movieActions.getById,
    searchMovieByName: movieActions.searchByName
}

const connectedManageMovie = connect(mapState, actionCreators)(ManageMovie);
export { connectedManageMovie as ManageMovie };