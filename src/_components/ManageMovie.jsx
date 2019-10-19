import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import '../style.css'

class ManageMovie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: true
        }
    }
    componentDidMount() {
        // this.props.getUsers();
    }

    handleDeleteUser(id) {
        // return (e) => this.props.deleteUser(id);
    }
    
    handleToggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    render() {
        const { user, users } = this.props;
        const showMenu = this.state.showMenu ? "" : "toggled"
        return (
            <div className={"d-flex " + showMenu} id="wrapper">
                <div className="bg-light border-right" id="sidebar-wrapper">
                    <div className="sidebar-heading">CINEMA MANAGEMENT</div>
                    <div className="list-group list-group-flush">
                        <a href="MovieManagement" className="list-group-item list-group-item-action bg-light">Movie Management</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Movie Schedule</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Edit Movie Schedule</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Sell Ticket</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Return ticket</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Statistics</a>
                    </div>
                </div>
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        <button className="btn btn-primary" id="menu-toggle" onClick={this.handleToggleMenu}><span class="navbar-toggler-icon"></span></button>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                            </li>
                        </ul>
                        </div>
                    </nav>
                    
                    <div>
                        <div class="col-sm-12">
                            <h3 className="center-text">Movie Management</h3>
                        </div>
                        <div className="container">
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
                                    <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons"></i> <span>Add New Employee</span></a>
                                    <a href="#deleteEmployeeModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons"></i> <span>Delete</span></a>						
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
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1} />
                                    <label htmlFor="checkbox1" />
                                    </span>
                                </td>
                                <td>Thomas Hardy</td>
                                <td>thomashardy@mail.com</td>
                                <td>89 Chiaroscuro Rd, Portland, USA</td>
                                <td>(171) 555-2222</td>
                                <td>
                                    <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                                    <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"></i></a>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="checkbox2" name="options[]" defaultValue={1} />
                                    <label htmlFor="checkbox2" />
                                    </span>
                                </td>
                                <td>Dominique Perrier</td>
                                <td>dominiqueperrier@mail.com</td>
                                <td>Obere Str. 57, Berlin, Germany</td>
                                <td>(313) 555-5735</td>
                                <td>
                                    <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                                    <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"></i></a>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="checkbox3" name="options[]" defaultValue={1} />
                                    <label htmlFor="checkbox3" />
                                    </span>
                                </td>
                                <td>Maria Anders</td>
                                <td>mariaanders@mail.com</td>
                                <td>25, rue Lauriston, Paris, France</td>
                                <td>(503) 555-9931</td>
                                <td>
                                    <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                                    <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"></i></a>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="checkbox4" name="options[]" defaultValue={1} />
                                    <label htmlFor="checkbox4" />
                                    </span>
                                </td>
                                <td>Fran Wilson</td>
                                <td>franwilson@mail.com</td>
                                <td>C/ Araquil, 67, Madrid, Spain</td>
                                <td>(204) 619-5731</td>
                                <td>
                                    <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                                    <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"></i></a>
                                </td>
                                </tr>					
                                <tr>
                                <td>
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="checkbox5" name="options[]" defaultValue={1} />
                                    <label htmlFor="checkbox5" />
                                    </span>
                                </td>
                                <td>Martin Blank</td>
                                <td>martinblank@mail.com</td>
                                <td>Via Monte Bianco 34, Turin, Italy</td>
                                <td>(480) 631-2097</td>
                                <td>
                                    <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                                    <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"></i></a>
                                </td>
                                </tr> 
                            </tbody>
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
                        </div>
                        {/* Edit Modal HTML */}
                        <div id="addEmployeeModal" className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <form>
                                <div className="modal-header">						
                                <h4 className="modal-title">Add Employee</h4>
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
                                <input type="submit" className="btn btn-success" defaultValue="Add" />
                                </div>
                            </form>
                            </div>
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
                            <form>
                                <div className="modal-header">						
                                <h4 className="modal-title">Delete Employee</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div className="modal-body">					
                                <p>Are you sure you want to delete these Records?</p>
                                <p className="text-warning"><small>This action cannot be undone.</small></p>
                                </div>
                                <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" />
                                <input type="submit" className="btn btn-danger" defaultValue="Delete" />
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    // const { users, authentication } = state;
    // const { user } = authentication;
    // return { user, users };
}

const actionCreators = {
    // getUsers: userActions.getAll,
    // deleteUser: userActions.delete
}

const connectedManageMovie = connect(mapState, actionCreators)(ManageMovie);
export { connectedManageMovie as ManageMovie };