import React from 'react';
import { connect } from 'react-redux';
import {movieActions} from '../../_actions'


class PickSeat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            row: ['A', 'B', 'C', 'D'],
            column: 10
        }
    }

    render() {
        
        return (
            <div>
                <div className="col-sm-12">
                    <h3 className="center-text">Pick Seat</h3>
                </div>
                <div>
                    {
                        this.state.row.map(rowName => (
                            <div>
                                <button type="button" class="btn btn-outline-info">{rowName}</button>
                                <button type="button" class="btn btn-outline-info">{rowName}</button>
                                <button type="button" class="btn btn-outline-info">{rowName}</button>
                                <button type="button" class="btn btn-outline-info">{rowName}</button>
                                <button type="button" class="btn btn-outline-info">{rowName}</button>
                                <button type="button" class="btn btn-outline-info">{rowName}</button>
                                <button type="button" class="btn btn-outline-info">{rowName}</button>
                                <button type="button" class="btn btn-outline-info">{rowName}</button>
                                <button type="button" class="btn btn-outline-info">{rowName}</button>
                                <button type="button" class="btn btn-outline-info">{rowName}</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const {movies}  = state;
    return {movies};
}

const actionCreators = {
}

const connectedPickSeat = connect(mapState, actionCreators)(PickSeat);
export { connectedPickSeat as PickSeat };