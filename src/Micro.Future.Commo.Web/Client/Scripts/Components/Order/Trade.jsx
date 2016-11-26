import React from 'react';

class Trade extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {trade, isMine} = this.props;
        return <div className='trade-node' key= {trade.tradeId}>
            <table>
                <thead>
                    <tr>
                        <td>
                            <span className='trade-number'>订单编号: {trade.tradeId}</span>
                            <span className='trade-title'>订单名称: {trade.tradeTitle}</span>
                            <span>交易金额: {trade.tradeAmount}</span>
                        </td>
                        <td>
                            <span className='trade-state'>交易状态: {this.getCurrentStateById(trade.currentState) }</span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        trade.orders.map((o, index) => {
                            return <tr key={o.orderId}>
                                <td>
                                    <div>企业名称:{o.enterpriseName}</div>
                                    <div>企业编号:{o.requirementId}</div>
                                </td>
                                <td className='no-border'>
                                    { 
                                        !isMine && index === 0 && trade.currentState < 6 ?
                                        <div>
                                            <span className='btn btn-large' onClick={()=>{this.props.updateToNextState(trade.tradeId, trade.currentState + 1)}}>{this.getNextStateAction(trade.currentState) }</span>
                                        </div> : null
                                    }
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    }

    getCurrentStateById(id) {
        let state = '合同'
        switch (id) {
            case 1:
                state = '签署合同';
                break;
            case 2:
                state = '支付资金';
                break;
            case 3:
                state = '交付货物';
                break;
            case 4:
                state = '开具发票';
                break;
            case 5:
                state = '支付尾款';
                break;
            case 6:
                state = '交易完成';
                break;
            default:
                break;
        }
        return state;
    }

    getNextStateAction(id) {
        let state = null
        switch (id) {
            case 1:
                state = '支付资金';
                break;
            case 2:
                state = '交付货物';
                break;
            case 3:
                state = '开具发票';
                break;
            case 4:
                state = '支付尾款';
                break;
            case 5:
                state = '完成交易';
                break;
            default:
                break;
        }
        return state;
    }
}

module.exports = Trade;