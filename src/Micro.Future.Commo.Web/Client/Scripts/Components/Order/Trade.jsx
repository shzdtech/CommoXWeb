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
                            return this.getOrderItem(o, index)
                        })
                    }

                </tbody>
            </table>
        </div>
    }

    getOrderItem(order, index) {
        let action = null;
        let className = null;
        if (order.orderStateId > this.props.trade.currentState) {
            className = 'updated';
        }

        if (this.props.trade.currentState < 6) {
            if (!this.props.isMine) {
                action = index === 0 && <div>
                    <span className='btn btn-large' onClick={() => { this.props.updateToNextState(this.props.trade.tradeId, this.props.trade.currentState + 1) } }>{this.getNextStateAction(this.props.trade.currentState) }</span>
                </div>
            } else {
                action = order.enterpriseId === this.props.enterpriseId && order.orderStateId === this.props.trade.currentState && <div>
                    <span className='btn btn-large' onClick={() => {
                        this.props.updateOrderToNextState(this.props.trade.tradeId, order.orderId, this.props.trade.currentState + 1)
                    }
                    }>{this.getNextOrderStateAction(this.props.trade.currentState) }</span>
                </div>
            }
        }

        return <tr key={order.orderId}>
            <td className={className}>
                <div>企业名称: {order.enterpriseName}</div>
                <div>企业编号: {order.requirementId}</div>
            </td>
            <td className='no-border'>
                {action}
            </td>
        </tr>
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

    getNextOrderStateAction(id) {
        let state = null
        switch (id) {
            case 1:
                state = '已签署合同';
                break;
            case 2:
                state = '已支付资金';
                break;
            case 3:
                state = '已交付货物';
                break;
            case 4:
                state = '已开具发票';
                break;
            case 5:
                state = '已支付尾款';
                break;
            default:
                break;
        }
        return state;
    }
}

module.exports = Trade;