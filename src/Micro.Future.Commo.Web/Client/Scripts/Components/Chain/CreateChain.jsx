import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';

class CreateChain extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {createChainState} = this.props;
        let overlay = <div className="overlay"></div>

        let list = createChainState.map((s, index) => {
            if (s.type === 1) {
                let r = s.requirement;
                return <div key={index} className="new-chain-node">
                    <div className='requirement'>
                        <div className='title'>{r.enterpriseName}</div>
                        {r.requirementId ? <div className='title'><span>需求ID: </span><span>{r.requirementId}</span></div> : null}
                        {r.type ? <div className='title'><span className='title'>需求类型：</span><span>{r.type === 1 ? '采购' : (r.type === 2 ? '销售' : '购销') }</span></div> : null}
                        {r.paymentAmount ? <div className='sub-title'><span>资金金额: </span><span>{r.paymentAmount}</span></div> : null}
                        {r.paymentDateTime ? <div className='sub-title'><span>货款支付时间: </span><span>{r.paymentDateTime}</span></div> : null}
                        {r.paymentType ? <div className='sub-title'><span>支付方式: </span><span>{r.paymentType}</span></div> : null}
                        {r.productPrice ? <div className='sub-title'><span>货物单价：</span><span>{r.productPrice}</span></div> : null}
                        {r.productName ? <div className='sub-title'><span>货物名称：</span><span>{r.productName}</span></div> : null}
                        {r.productQuantity ? <div className='sub-title'><span>货物数量：</span><span>{r.productQuantity}</span></div> : null}
                        {r.productUnit ? <div className='sub-title'><span>货物单位：</span><span>{r.productUnit}</span></div> : null}
                        {r.tradeAmount ? <div className='sub-title'><span>合同总金额：</span><span>{r.tradeAmount}</span></div> : null}
                    </div>
                    {overlay}
                    <div className="delete-icon glyphicon glyphicon-remove-sign" onClick={() => { this.props.removeChainNode(index) } }></div>
                </div>
            } else if (s.type === 2) {
                return <div key={index} className="new-chain-node">
                    <span className='notation'>单个</span>
                    {overlay}
                    <div className="delete-icon glyphicon glyphicon-remove-sign" onClick={() => { this.props.removeChainNode(index) } }></div>
                </div>
            } else {
                return <div key={index} className="new-chain-node">
                    <span className='notation'>任意</span>
                    {overlay}
                    <div className="delete-icon glyphicon glyphicon-remove-sign" onClick={() => { this.props.removeChainNode(index) } }></div>
                </div>
            }
        })

        return <div className='create-chain-container'>
            <div className="actions">
                <div className="btn" onClick={this.props.createRequirement}>创建</div>
                <div className="btn" onClick={this.props.selectRequirement}>选择</div>
                <div className="btn" onClick={this.props.randomOne}>随机匹配一个</div>
                <div className="btn" onClick={this.props.randomMore}>随机匹配多个</div>
            </div>
            <div className='new-chain-list'>
                {list}
            </div>
        </div>
    }
}

module.exports = CreateChain;