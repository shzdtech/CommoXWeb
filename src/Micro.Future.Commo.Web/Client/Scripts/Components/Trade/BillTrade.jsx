import React from 'react';

class BillTrade extends React.Component {
    constructor() {
        super();
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
        </div>
    }
}

module.exports = BillTrade;