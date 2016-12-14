import React from 'react';

class FundTrade extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchFinance();
    }

    render() {

        let book = require('../../../Content/images/book.png');
        let fundtrade = require('../../../Content/images/fundtrade.png');
        let arrow = require('../../../Content/images/arrow.png');

        let list = this.props.financeInfoList.map((f) => {
            return <tr key={f.productId}>
                <td className='left'>{f.bankAddress}</td>
                <td>{f.productTerm}天</td>    
                <td>{f.productYield}%</td>
            </tr>
        });

        return <div>
            <div className='jumbotron'>
                <div className='container'>
                    <p>企业闲置资金</p>
                    <p><span className='quatation strong'>活期理财</span></p>
                    <p className='description'>80%的企业闲置资金在银行睡大觉的时候我们已经赚取了十几倍的利息</p>
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
                        <a onClick={this.startFundTrade.bind(this) }>
                            <img src={fundtrade} />
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
                                    银行
                                </td>
                                <td>
                                    投资期限
                                </td>
                                <td>
                                    预计年化收益
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                </div>

                <div className='clearfix'></div>
            </div>
        </div>
    }

    startFundTrade() {
        this.props.startFundTrade();
    }
}

module.exports = FundTrade;