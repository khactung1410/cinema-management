import React from 'react';
import { connect } from 'react-redux';
import {seatStatusActions, scheduleActions, billActions} from '../../_actions'
import moment from 'moment';

class PickSeat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listSeatStatus: this.props.seatStatus.items ? this.props.seatStatus.items.listSeatStatus : null,
            listSeatbyRoom: null,
            column: 10,
            sellingTicket: this.props.sellingTicket,
            total: 0,
            seats: null, //name of seats just have picked
            seatsWillBeChangedStatus: null, //list seats just have picked
            bill: {
                name: '',
                room: '',
                seats: '',
                employee: '',
                startAt: '',
                endAt: '',
                date: '',
                price: '',
                totalSeat: null,
                buyAt: new Date()
            }
        }
    }

    componentDidMount() {
        // this.setState({
        //     sellingTicket: this.props.sellingTicket
        // })
        // setTimeout(()=> {
        //     this.setState({
        //         listSeatbyRoom: this.props.seatByRoom.items.listSeatByRoom,
        //         listSeatStatus: this.props.seatStatus.items.listSeatStatus
        //     })
        // },400)
    }
    chunkArray(myArray, chunk_size){
        var results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }

    pickSeat(pickedSeat) {
        return () => {
            console.log(pickedSeat)
            var seats = this.state.seats ? this.state.seats : []
            var seatsWillBeChangedStatus = this.state.seatsWillBeChangedStatus ? this.state.seatsWillBeChangedStatus : []
            if(seats.includes(pickedSeat.name)) {
                seats = seats.filter(seat => seat != pickedSeat.name)
                seatsWillBeChangedStatus = seatsWillBeChangedStatus.filter(seatStatus => seatStatus.name != pickedSeat.name)
                var total = this.state.total - Number(this.props.sellingTicket.ticketPrice)
                this.setState({
                    seats: seats,
                    total: total,
                    seatsWillBeChangedStatus: seatsWillBeChangedStatus
                })
            }
            else {
                seats.push(pickedSeat.name)
                seatsWillBeChangedStatus.push(pickedSeat)
                var total = this.state.total + Number(this.props.sellingTicket.ticketPrice)
                this.setState({
                    seats: seats,
                    total: total,
                    seatsWillBeChangedStatus: seatsWillBeChangedStatus
                })
            }
            console.log("seats: ",this.state.seats)
            console.log(this.state.seatsWillBeChangedStatus)
        }
    }
    changeStatus = () => {
        //changeStatus of seatStatus
        var idsSeatStatus = this.state.seatsWillBeChangedStatus.map(seatStatus => {
            return seatStatus.id
        })
        this.props.changeStatus(idsSeatStatus)

        //update remaining ticket
        var schedule = this.props.sellingTicket
        schedule.remainingTicket = schedule.remainingTicket - this.state.seatsWillBeChangedStatus.length
        this.props.updateRemainingTicketOfSchedule(schedule)

        //create Bill
        this.setState({
            bill: {
                name: schedule.name,
                room: schedule.room,
                seats: this.state.seats.toString(),
                employee: JSON.parse(localStorage.getItem('user')).text.fullname,
                startAt: schedule.startAt,
                endAt: schedule.endAt,
                date: schedule.date,
                price: this.state.total,
                totalSeat: this.state.seats.length,
                buyAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            }
        })
        setTimeout(()=>{
            console.log("Bill: ", this.state.bill)
            var bill = this.state.bill
            this.props.createBill(bill)
        },100)
        
    }

    render() {
        console.log("sell Ticket: ", this.state.sellingTicket)
        var listSeatStatus = this.props.seatStatus.items ? this.props.seatStatus.items.listSeatStatus : null
        var listSeatbyRoom = this.props.seatByRoom.items ? this.props.seatByRoom.items.listSeatByRoom : null
        var seats = this.state.seats ? this.state.seats : []

        listSeatbyRoom ? listSeatbyRoom.map(seat => {
            listSeatStatus? listSeatStatus.map(seatStatus => {
                if(seat.id == seatStatus.idSeat) {
                    seatStatus.name = seat.name
                }
            }): null
        }):null

        var seatMap = listSeatStatus ? this.chunkArray([...listSeatStatus], this.state.column) : null
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
                        <p>Seats :  
                            <span>
                                {
                                    this.state.seats? ' '+this.state.seats+' ' : ''
                                }
                            </span>
                        </p>
                    </div>
                    <div className="col">
                        <p>Total : <span>{this.state.total}</span></p>
                    </div>
                    <div className="col"></div>
                </div>
                <div>
                    <div style={{margin: "50px 0px"}}>
                        <button type="button" className="col btn btn-primary">SCREEN</button>
                    </div>
                    {
                        seatMap ? seatMap.map((arrSeatRow, key) => (
                            <div className="row top-buffer" key={key}>
                                {
                                    arrSeatRow.map((seatStatus, key) => (
                                        <div className="col-sm" key={key}>
                                            {
                                                (seatStatus.status=='EMPTY') ? (
                                                    seats.includes(seatStatus.name) ? (<button type="button" onClick={this.pickSeat(seatStatus)} className="btn btn-info">{seatStatus.name}</button>) :
                                                    <button type="button" onClick={this.pickSeat(seatStatus)} className="btn btn-outline-info">{seatStatus.name}</button>
                                                ):
                                                (
                                                    <button type="button" className="btn btn-danger">{seatStatus.name}</button>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        )) : null
                    }
                    <div className="row">
                        <div className="col"></div>
                        <div className="col"></div>
                        <button type="button" onClick={this.changeStatus} className="col btn btn-primary">OK</button>
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
    changeStatus: seatStatusActions.changeStatus,
    updateRemainingTicketOfSchedule: scheduleActions.updateRemainingTicket,
    createBill: billActions.add
}

const connectedPickSeat = connect(mapState, actionCreators)(PickSeat);
export { connectedPickSeat as PickSeat };