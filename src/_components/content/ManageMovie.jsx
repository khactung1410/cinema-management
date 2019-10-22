import React from 'react';
import { connect } from 'react-redux';
import { CommonModal } from '../modal/modal';
import {ModalAdd} from '../modal/ModalAdd'
import {movieActions} from '../../_actions'

class ManageMovie extends React.Component {
    constructor(props) {
        super(props)
        this.modalAdd = React.createRef();
        this.modalDeleteMultiple = React.createRef();
        this.modalDeleteSingle = React.createRef();
    }

    componentDidMount() {
        this.props.getMovies()
    };

    handleShow = (modal) => {
        return () => modal.current.handleShow()
    }

    handleClose = (modal) => {
        return () => modal.current.handleClose()
    }

    render() {
        const {movies} = this.props
        return (
            <React.Fragment>
                <ModalAdd modalAdd = {this.modalAdd}/>
                <CommonModal ref={this.modalDeleteMultiple}>
                    <form>
                        <div className="modal-header">						
                        <h4 className="modal-title">Delete Employee</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.handleClose(this.modalDeleteMultiple)}>×</button>
                        </div>
                        <div className="modal-body">					
                        <p>Are you sure you want to delete these Records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                        </div>
                        <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" onClick={this.handleClose(this.modalDeleteMultiple)}/>
                        <input type="submit" className="btn btn-danger" defaultValue="Delete" />
                        </div>
                    </form>
                </CommonModal>
                <CommonModal ref={this.modalDeleteSingle}>
                    <form>
                        <div className="modal-header">						
                        <h4 className="modal-title">Delete Employee</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.handleClose(this.modalDeleteSingle)}>×</button>
                        </div>
                        <div className="modal-body">					
                        <p>Are you sure you want to delete these Records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                        </div>
                        <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" onClick={this.handleClose(this.modalDeleteSingle)}/>
                        <input type="submit" className="btn btn-danger" defaultValue="Delete" />
                        </div>
                    </form>
                </CommonModal>


                <div className="col-sm-12">
                    <h3 className="center-text">Movie Management</h3>
                </div>
                <div className="table-wrapper">
                    <div className="table-title">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="search-box">
                                <div className="input-group">								
                                    <input type="text" id="search" className="form-control" placeholder="Search by Name" />
                                    <span className="input-group-addon"><i className="material-icons"></i></span>
                                </div>
                                </div>
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
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Director</th>
                        <th>Public Year</th>
                        <th>Description</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    {
                        movies.items.movies &&
                            movies.items.movies.map(movie => {
                                <tbody>
                                <tr>
                                <td>
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1} />
                                    <label htmlFor="checkbox1" />
                                    </span>
                                </td>
                                <td>{movie.name}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.director}</td>
                                <td>{movie.publicYear}</td>
                                <td>{movie.description}</td>
                                <td>
                                    <a className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                                    <a className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete" onClick={this.handleShow(this.modalDeleteSingle)}></i></a>
                                </td>
                                </tr>
                            </tbody>
                            })
                    }
                    
                    </table>
                    <div className="clearfix">
                    <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                    <ul className="pagination">
                        <li className="page-item disabled"><a href="#">Previous</a></li>
                        <li className="page-item"><a href="#" className="page-link">1</a></li>
                        <li className="page-item"><a href="#" className="page-link">2</a></li>
                        <li className="page-item active"><a href="#" className="page-link">3</a></li>
                        <li className="page-item"><a href="#" className="page-link">4</a></li>
                        <li className="page-item"><a href="#" className="page-link">5</a></li>
                        <li className="page-item"><a href="#" className="page-link">Next</a></li>
                    </ul>
                    </div>
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
    getMovies: movieActions.getAll
}

const connectedManageMovie = connect(mapState, actionCreators)(ManageMovie);
export { connectedManageMovie as ManageMovie };