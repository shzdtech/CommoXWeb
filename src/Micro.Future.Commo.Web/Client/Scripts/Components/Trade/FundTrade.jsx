import React from 'react';

class FundTrade extends React.Component {
    constructor() {
        super();
    }

    render() {  
        
        let book = require('../../../Content/images/book.png');
        let fundtrade = require('../../../Content/images/fundtrade.png');
        let arrow = require('../../../Content/images/arrow.png');

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
                        <img src={fundtrade} />
                    </li>
                </ul>
            </div>
        </div>
    }
}

module.exports = FundTrade;