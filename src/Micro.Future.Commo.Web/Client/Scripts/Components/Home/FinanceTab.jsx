import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Tab from '../Common/Tab';

class FinanceTab extends React.Component {
    constructor() {
        super();
    }

    componentDidMount(){
        this.props.fetchFinanceList();
    }
    render() {
        let {financeInfoList} = this.props;
        var list = financeInfoList.map((f)=>{
            return  <div className="col-md-6 finance-item" key={f.productId}>
                    <div className="col">
                        <div className='title'>{f.bankAddress}</div>
                        <div className='description'>投资期限{f.productTerm}天</div>
                    </div>
                     <div className="col">
                        <div className='title'>{f.productYield}%</div>
                        <div className='description'>预计年化收益</div>
                    </div>
                </div>
        })
        return <div className='finance-tab'>
            <div className='tab-title'>大额理财，共赢未来</div>
            <div className='tab-sub-title'></div>
            <div className='container finance-list'>             
                {list}
            </div>
        </div>
    }
}

module.exports = FinanceTab;