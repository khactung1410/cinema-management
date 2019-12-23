import React from 'react';
import { connect } from 'react-redux';
import { CommonModal } from '../modal/modal';
import {ModalAdd} from '../modal/genre/ModalAdd'
import {ModalEdit} from '../modal/genre/ModalEdit'
import {ModalDeleteSingle} from '../modal/genre/ModalDeleteSingle'
import {genreActions} from '../../_actions'
import _ from 'lodash'
import { SearchGenre } from './SearchGenre';

class ManageGenre extends React.Component {
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
        return () => {
            this.props.getGenreById(id)
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
            searchingName ? this.props.searchGenreByName(searchingName,page) : this.props.getGenres(page)
        }
    }

    handleCheck = (event) => {
        console.log(event.target.value)
    }

    render() {
        const {genres} = this.props
        console.log("genres", genres)
        return (
            <React.Fragment>
                <ModalAdd modalAdd = {this.modalAdd}/>
                <ModalEdit modalEdit = {this.modalEdit} idEditting={this.state.idEditting}/>
                <ModalDeleteSingle modalDeleteSingle = {this.modalDeleteSingle} idDelete={this.state.idDelete}/>
                <div className="col-sm-12">
                    <h3 className="center-text">Genre Management</h3>
                </div>
                <div className="table-wrapper">
                    <div className="table-title">
                    <div className="row">
                        <div className="col-sm-4">
                            <SearchGenre />
                        </div>
                        <div className="col-sm-8">
                            <a className="btn btn-success" onClick={this.handleShow(this.modalAdd)}><i className="material-icons"></i> <span>Add New Genre</span></a>
                            {/* <a className="btn btn-danger" onClick={this.handleShow(this.modalDeleteMultiple)}><i className="material-icons"></i> <span>Delete</span></a>						 */}
                        </div>
                    </div>
                    </div>
                    <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                        {/* <th>
                            <span className="custom-checkbox">
                            <input type="checkbox" id="selectAll" />
                            <label htmlFor="selectAll" />
                            </span>
                        </th> */}
                        <th style={{width: 30 + '%'}}>Name</th>
                        <th style={{width: 20 + '%'}}>Country</th>
                        <th style={{width: 10 + '%'}}>Total movie has</th>
                        <th style={{width: 20 + '%'}}>Languge</th>
                        <th >Actions</th>
                        </tr>
                    </thead>
                    {
                        genres.items &&
                            genres.items.genres.map((genre,key) => (
                                <tbody key={key}>
                                <tr>
                                {/* <td>
                                    <span className="custom-checkbox">
                                    <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1} onClick={this.handleCheck}/>
                                    <label htmlFor="checkbox1" />
                                    </span>
                                </td> */}
                                <td style={{width: 30 + '%'}}>{genre.name}</td>
                                <td style={{width: 20 + '%'}}>{genre.country}</td>
                                <td style={{width: 10 + '%'}}>{genre.totalMovieHas}</td>
                                <td style={{width: 20 + '%'}}>{genre.language}</td>
                                <td>
                                    <a className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit" onClick={this.handleShowEdit(this.modalEdit, genre.id)}></i></a>
                                    <a className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete" onClick={this.handleShow(this.modalDeleteSingle, genre.id)}></i></a>
                                </td>
                                </tr>
                            </tbody>
                            ))
                    }
                    </table>
                    {genres.items &&
                        <div className="clearfix">
                        <div className="hint-text">Showing <b>{genres.items.genres.length}</b> out of <b>{genres.items.total}</b> items</div>
                        <ul className="pagination">
                            <li className="page-item" onClick={genres.items.searchingName ? this.changePage((genres.items.current_page>1)?genres.items.current_page-1:1, genres.items.searchingName): this.changePage((genres.items.current_page>1)?genres.items.current_page-1:1)}><a href="#" className="page-link">Previous</a></li>
                            {
                                _.times(genres.items.total_page, (key) => (<li key={key} className={(genres.items.current_page == key+1)?"page-item active":"page-item"} onClick={genres.items.searchingName ? this.changePage(key+1, genres.items.searchingName) : this.changePage(key+1)}><a href="#" className="page-link">{key+1}</a></li>))
                            }
                            <li className="page-item" onClick={genres.items.searchingName ? (this.changePage((genres.items.current_page < genres.items.total_page)?genres.items.current_page+1:genres.items.total_page, genres.items.searchingName)) : this.changePage((genres.items.current_page < genres.items.total_page)?genres.items.current_page+1:genres.items.total_page)}><a href="#" className="page-link" disabled={false}>Next</a></li>
                        </ul>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

function mapState(state) {
    const {genres}  = state;
    return {genres};
}

const actionCreators = {
    getGenres: genreActions.getAll,
    getGenreById: genreActions.getById,
    searchGenreByName: genreActions.searchByName
}

const connectedManageGenre = connect(mapState, actionCreators)(ManageGenre);
export { connectedManageGenre as ManageGenre };