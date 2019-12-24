import React from 'react'
import Chart from 'chart.js'

class LineChart extends React.Component {
    constructor(props) {
        super(props)
        this.canvas = React.createRef()
    }

    componentDidMount() {
        const ctx = this.canvas.current.getContext('2d')
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    fill: false,
                    borderColor: this.props.color,
                    data: this.props.data
                }],
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: { day: 'DD/MM' }
                        }
                    }]
                }
            }
        })
    }

    render() {
        return (
            <canvas ref={this.canvas}/>
        )
    }
}

export default LineChart