import Chart from 'chart.js';
import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Tab from '../Common/Tab';
import Dropdown from '../Account/Dropdown';
import {HOST} from '../../appSettings';
import moment from 'moment';

class BasisTab extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.fetchData(this.props.productCodeDropDown.value)
    }

    render() {
        return <div className='basis-tab'>
            <div className='tab-title'>基差</div>
            <div>
                <Dropdown key={this.props.productCodeDropDown.key} info={this.props.productCodeDropDown}
                    onChangeForm={this.selectProductCode.bind(this) } />
            </div>
            <div className='container basis-chart-container'>
                <canvas className='basis-chart'></canvas>
            </div>
        </div>
    }

    selectProductCode(key, value) {
        this.props.selectProductCode(key, value);
        this.fetchData(value.value);
    }

    fetchData(productCode) {
        $.get(HOST + 'api/Basis?productCode=' + productCode).then((res) => {
            let data = $.parseJSON(res);
            let dataGroup = this.groupByArray(data, (d) =>{
                return d._id.split(' ')[0].split('_')[1];
            });
            this.renderChart(dataGroup);
        })
    }

    groupByArray(xs, key) {
        return xs.reduce((rv, x) => {
            let v = key instanceof Function ? key(x) : x[key];
            let el = rv.find((r) => r && r.key === v);
            if (el) {
                el.values.push(x);
            } else {
                rv.push({ key: v, values: [x] });
            }
            return rv;
        }, []);
    }

    renderChart(dataGroup) {
        const colors = ['#E68F74', '#9B995E', '#707FA6', '#E5E466', '#00B0EC', '#BD7C92', '#01D9B2'];
        let dataRange = [];
        if (dataGroup.length > 0) {
            dataGroup[0].values.forEach((v) => {
                dataRange.push(v.CONTRACT);
            });
        }
        let datasets = [];
        dataGroup.forEach((r, index) => {
            let color = colors[index % colors.length];
            datasets.push({
                label: moment(r.key).format('YYYY-MM-DD'),
                fill: false,
                lineTension: 0.1,
                backgroundColor: color,
                borderColor: color,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: color,
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: color,
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: r.values.map((v) => { return v.SETTLE; }),
                spanGaps: false,
            })
        })

        let chartData = {
            labels: dataRange,
            datasets: datasets
        };

        $('.basis-chart').remove();
        $('.basis-chart-container').append('<canvas class="basis-chart"><canvas>');
        let ctx = $('.basis-chart')[0].getContext('2d');
        let options = {};
        let myLineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
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
}

module.exports = BasisTab;