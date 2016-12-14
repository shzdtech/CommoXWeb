import React from 'react';

class BillTrade extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchAcceptance();
    }

    render() {
        let book = require('../../../Content/images/book.png');
        let billtrade = require('../../../Content/images/billtrade.png');
        let arrow = require('../../../Content/images/arrow.png');

        let list = this.props.acceptanceList.map((acceptance) => {
            return <tr key={acceptance.acceptanceId}>
                <td className='left'>{acceptance.bankName}</td>
                <td>{acceptance.amount}</td>
                <td>{acceptance.acceptanceType === 1 ? '国股' : (acceptance.acceptanceType === 2 ? '城商' : '农商') }</td>
                <td>{new Date(acceptance.drawTime).toLocaleDateString() }</td>
                <td>{new Date(acceptance.dueDate).toLocaleDateString() }</td>
                <td>{acceptance.subsidies}%</td>
            </tr>
        });

        return <div>
            <div className='jumbotron'>
                <div className='container'>
                    <p>小额承兑汇票<span className='quatation'>快速变现</span></p>
                    <p>票面<span className='quatation'>金额不限</span></p>
                    <p>不受承兑行限制</p>
                </div>
            </div>
            <div className="billstep">
                <ul>
                    <li className="li1">
                        <img src={book} />
                    </li>
                    <li className="li2">
                        <img src={arrow} />
                    </li>
                    <li className="li3">
                        <a onClick={this.startBillTrade.bind(this) }>
                            <img src={billtrade} />
                        </a>
                    </li>
                </ul>
            </div>
            <div className='container invest-info'>
                <div className='invest-tab'>
                    <table>
                        <thead>
                            <tr>
                                <td className='left'>
                                    开票行
                                </td>
                                <td>
                                    票面金额（单位：万）
                                </td>
                                <td>
                                    开票行类别
                                </td>
                                <td>
                                    出票日期
                                </td>
                                <td>
                                    到期日
                                </td>
                                <td>
                                    贴息(年)
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }

    startBillTrade() {
        this.props.startBillTrade();
    }
}

module.exports = BillTrade;