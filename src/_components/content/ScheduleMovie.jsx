import React from 'react';
import { connect } from 'react-redux';
import { CommonModal } from '../modal/modal';
import {ModalAdd} from '../modal/movie/ModalAdd'
import {ModalEdit} from '../modal/movie/ModalEdit'
import {ModalDeleteSingle} from '../modal/movie/ModalDeleteSingle'
import {ModalDeleteMultiple} from '../modal/movie/ModalDeleteMultiple'
import {movieActions} from '../../_actions'
import _ from 'lodash'
import { Search } from './Search';

class ScheduleMovie extends React.Component {
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
    };

    handleShow = (modal,id) => {
        return () => {
            if(id) this.setState({
                        idDelete: id
                    })
            modal.current.handleShow()
        }
    }

    handleShowEdit = (modal,id) => {
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
        return (
            <React.Fragment>
                <ModalAdd modalAdd = {this.modalAdd}/>
                <ModalEdit modalEdit = {this.modalEdit} idEditting={this.state.idEditting}/>
                <ModalDeleteMultiple modalDeleteMultiple = {this.modalDeleteMultiple}/>
                <ModalDeleteSingle modalDeleteSingle = {this.modalDeleteSingle} idDelete={this.state.idDelete}/>
                <div className="col-sm-12">
                    <h3 className="center-text">Movie Schedule</h3>
                </div>
                <div className="table-wrapper">
                    <div className="table-title">
                    <div className="row">
                        <div className="col-sm-4">
                            <Search />
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
                        <th style={{width: 30 + '%'}}>Description</th>
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
                                <td style={{width: 30 + '%'}}>{movie.description}</td>
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
                        <div className="hint-text">Showing <b>{movies.items.per_page}</b> out of <b>{movies.items.total}</b> entries</div>
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
                {/* Edit Modal HTML */}
                <div id="editEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        
                    <form>
                        <div className="modal-header">						
                        <h4 className="modal-title">Edit Employee</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">					
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea className="form-control" required defaultValue={""} />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" className="form-control" required />
                        </div>					
                        </div>
                        <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" />
                        <input type="submit" className="btn btn-info" defaultValue="Save" />
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                {/* Delete Modal HTML */}
                <div id="deleteEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                    
                    </div>
                </div>
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
    getMovieById: movieActions.getById,
    searchMovieByName: movieActions.searchByName
}

const connectedScheduleMovie = connect(mapState, actionCreators)(ScheduleMovie);
export { connectedScheduleMovie as ScheduleMovie };