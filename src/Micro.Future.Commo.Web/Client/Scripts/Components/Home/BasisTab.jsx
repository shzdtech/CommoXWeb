import Chart from 'chart.js';
import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Tab from '../Common/Tab';

class BasisTab extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        let data = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "Octomber", "Novmber", "December"],
            datasets: [
                {
                    label: "铜",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [37865, 37659,37780, 38780, 39120, 37220, 36740, 36580, 37320, 37850, 37999, 38850],
                    spanGaps: false,
                }
            ]
        };

        let ctx = $('.basis-chart')[0].getContext('2d');
        let options = {};
        let myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                }
            }
        });
    }
    render() {
        return <div className='basis-tab'>
            <div className='tab-title'>基差</div>
            <div className='container'>
                <canvas className='basis-chart'></canvas>
            </div>
        </div>
    }
}

module.exports = BasisTab;