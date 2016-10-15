import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Tab from '../Common/Tab';

var acceptanceBill=[{
    name: ''
}]

class AcceptanceBillTab extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='finance-tab'>
            <div className='tab-title'>商业汇票贴现</div>
            <div className='container finance-list'>
                <div className="col-md-6 finance-item">
                    <div className="col">
                        <div className='title'>理财一号</div>
                        <div className='description'>稳健型 代号8906 投资期限1年</div>
                    </div>
                     <div className="col">
                        <div className='title'>4.00%</div>
                        <div className='description'>预计年化收益</div>
                    </div>
                </div>
                <div className="col-md-6 finance-item">
                    <div className="col">
                        <div className='title'>美元天天金</div>
                        <div className='description'>进取型 代号6941 投资期限30天</div>
                    </div>
                     <div className="col">
                        <div className='title'>10.00%</div>
                        <div className='description'>预计年化收益</div>
                    </div>
                </div>
                <div className="col-md-6 finance-item">
                    <div className="col">
                        <div className='title'>新人专享937号</div>
                        <div className='description'>固定收益 投资期限176天</div>
                    </div>
                     <div className="col">
                        <div className='title'>8.00%</div>
                        <div className='description'>预计年化收益</div>
                    </div>
                </div>
                <div className="col-md-6 finance-item">
                    <div className="col">
                        <div className='title'>大赢家</div>
                        <div className='description'>进取型 代号6941 投资期限176天</div>
                    </div>
                     <div className="col">
                        <div className='title'>6.20%</div>
                        <div className='description'>预计年化收益</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

module.exports = AcceptanceBillTab;