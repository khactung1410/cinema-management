import React from 'react';
import { connect } from 'react-redux';


class PickSeat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listSeatbyRoom: null,
            listSeatStatus: null,
            row: ['A', 'B', 'C', 'D'],
            column: 10,
            sellingTicket: null
        }
    }

    componentDidMount() {
        setTimeout(()=>{
            this.props.seatByRoom.items ? this.setState({
                listSeatbyRoom: this.props.seatByRoom.items.seatByRoom
            }) : null

            console.log("aaaaaa", this.props.seatStatus)
            this.props.seatStatus.items ? this.setState({
                listSeatStatus: this.props.seatStatus.items.listSeatStatus
            }) : null

            
        }, 500)
    }

    render() {
        return (
            <div className="container">
                <div className="row top-buffer">
                    <div className="col"></div>
                    <div className="col">
                        <p>Movies : <span>{this.props.sellingTicket ? this.props.sellingTicket.name:""}</span></p>
                    </div>
                    <div className="col">
                        <p>Time : <span>{this.props.sellingTicket ? this.props.sellingTicket.date+' - '+this.props.sellingTicket.startAt : ""}</span></p>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row top-buffer">
                    <div className="col"></div>
                    <div className="col">
                        <p>Seats : </p>
                    </div>
                    <div className="col">
                        <p>Total : </p>
                    </div>
                    <div className="col"></div>
                </div>
                <div>
                    {
                        this.state.row.map((rowName, key) => (
                            <div className="row top-buffer" key={key}>
                                {
                                    [...Array(this.state.column)].map((seat, key) => (
                                        <div className="col-sm" key={key}>
                                            <button type="button" className="btn btn-outline-info">{rowName}{key+1}</button>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                    <div className="row">
                        <div className="col"></div>
                        <div className="col"></div>
                        <button type="button" className="col btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const {seatStatus, seatByRoom}  = state;
    return {seatStatus, seatByRoom};
}

const actionCreators = {
}

const connectedPickSeat = connect(mapState, actionCreators)(PickSeat);
export { connectedPickSeat as PickSeat };