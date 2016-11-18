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
                        <img src={billtrade} />
                    </li>
                </ul>
            </div>
            <div className='container invest-info'>
             <div className='invest-info-title'>
                承兑产品
             </div>
                {
                    this.props.acceptanceList.map((f)=>{
                        return <div className='invest-item'>
                            <span>{f.subsidies}%</span>
                            <span className='item-title'>贴息</span>
                        </div>
                    })
                }

                <div className='clearfix'></div>
            </div>
        </div>
    }
}

module.exports = BillTrade;