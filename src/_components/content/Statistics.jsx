import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import LineChart from '../standalone/LineChart'

class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            statistic: {
                ticket: [
                    {
                        t: moment().startOf('d'),
                        y: 10
                    },
                    {
                        t: moment().subtract(1, 'd').startOf('d'),
                        y: 20
                    }
                ],
                revenue: []
            }
        }
    }

    onStartDateChanged = date => {
        this.setState({ startDate: date })
    }

    onEndDateChanged = date => {
        this.setState({ endDate: date })
    }

    statistic = e => {
        e.preventDefault()
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-sm-12 mb-4">
                    <h3 className="center-text">Statistics</h3>
                </div>
                <div className="container">
                    <form className="form-inline mb-4">
                        <DatePicker className="form-control mr-2" dateFormat="yyyy-MM-dd" placeholderText="Start date"
                            onChange={this.onStartDateChanged} selected={this.state.startDate}/>
                        <DatePicker className="form-control mr-2" dateFormat="yyyy-MM-dd" placeholderText="End date"
                            onChange={this.onEndDateChanged} selected={this.state.endDate}/>
                        <button className="btn btn-primary" onClick={this.statistic}>Search</button>
                    </form>

                    <div className="card p-3 mb-4">
                        <div className="card-body">
                            <h4 className="card-title">Total ticket counts</h4>
                            <LineChart color='#007bff' data={this.state.statistic.ticket}/>
                        </div>
                    </div>
                    
                    <div className="card p-3 mb-4">
                        <div className="card-body">
                            <h4>Total revenue</h4>
                            <LineChart color='#007bff' data={this.state.statistic.revenue}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export { Statistics }
