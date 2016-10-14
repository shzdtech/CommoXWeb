import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Tab from '../Common/Tab';

class PriceTab extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='price-tab'>
            <div className='container'>
                <Tab title='EASEMORE 价格'>
                    <ul className='external-links'>
                        <li>
                            <a href="#">指数</a>
                        </li>
                        <li>
                            <a href="#">贵金属指数</a>
                        </li>
                        <li>
                            <a href="#">订阅价格短信</a>
                        </li>
                        <li>
                            <a href="#">更多</a>
                        </li>
                    </ul>
                    <div className='price-table'>
                        <div className="price-header">
                            <span className='name'>品名</span>
                            <span>价格</span>
                            <span>均价</span>
                            <span>涨跌</span>
                            <span>日期</span>
                            <span>市场</span>
                        </div>
                        <div className="price-content">
                            <div>
                                <span className='name'>1#铜</span>
                                <span className='decrease'>37660-37740</span>
                                <span className='decrease'>37700</span>
                                <span className='decrease'>-70</span>
                                <span>10-10</span>
                                <span>></span>
                            </div>
                             <div>
                                <span className='name'>1#铅</span>
                                <span className='decrease'>125700-125890</span>
                                <span className='decrease'>125810</span>
                                <span className='decrease'>-30</span>
                                <span>10-10</span>
                                <span>></span>
                            </div>
                             <div>
                                <span className='name'>升贴水</span>
                                <span>（升）60 -（升）140</span>
                                <span>100</span>
                                <span>30</span>
                                <span>10-10</span>
                                <span>></span>
                            </div>
                             <div>
                                <span className='name'>1#锡</span>
                                <span className='increase'>15460-15600</span>
                                <span className='increase'>15800</span>
                                <span className='increase'>50</span>
                                <span>10-10</span>
                                <span>></span>
                            </div>
                        </div>
                    </div>
                </Tab>
            </div>
        </div>
    }
}

module.exports = PriceTab;