import React from 'react';
import FileUploadComponent from '../Common/FileUploadComponent';

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
            <div className='show-big-picture-overlay'></div>
        </div>
    }

    getOrderItem(order, index) {
        let action = null;
        let className = null;
        let uploadComponent = null;
        if (order.orderStateId > this.props.trade.currentState) {
            className = 'updated';
        }

        if (this.props.trade.currentState < 6) {
            if (!this.props.isMine) {
                action = index === 0 && <div>
                    <span className='btn btn-large' onClick={() => { this.props.updateToNextState(this.props.trade.tradeId, this.props.trade.currentState + 1) } }>{this.getNextStateAction(this.props.trade.currentState) }</span>
                </div>
            } else {
                if (order.enterpriseId === this.props.enterpriseId && order.orderStateId === this.props.trade.currentState) {
                    action = <div>
                        <span className='btn btn-large' onClick={() => {
                            this.props.updateOrderToNextState(this.props.trade.tradeId, order.orderId, this.props.trade.currentState + 1)
                        }
                        }>{this.getNextOrderStateAction(this.props.trade.currentState) }</span>
                    </div>
                    uploadComponent = this.getUploadComponenet(order.orderId, this.props.trade.currentState);
                }
            }
        }

        let contractImages = [];
        let invoiceImages = [];

        let deleteAction = (imageId) =>{
            return order.enterpriseId === this.props.enterpriseId && this.props.isMine ? <span className='glyphicon glyphicon-trash' onClick={()=>{this.props.deleteOrderImages(this.props.trade.tradeId, order.orderId, imageId)}}></span> : null
        }

        if (order.orderImages !== null) {
            order.orderImages.forEach((image) => {
                if (image.imageType === 1) {
                    contractImages.push(<span key={image.imageId}><img className='image-thumbnail' src={image.imagePath} onClick={()=>this.props.showBigImage(image.imagePath)} />{this.props.trade.currentState === 1 ? deleteAction(image.imageId) : null}</span>);
                } else if (image.imageType === 2) {
                    invoiceImages.push(<span key={image.imageId}><img className='image-thumbnail' src={image.imagePath} onClick={()=>this.props.showBigImage(image.imagePath)} />{this.props.trade.currentState === 4 ? deleteAction(image.imageId) : null}</span>);
                }
            })
        }
        if (contractImages.length > 0) {
            contractImages.unshift(<span key='contract-image-title' className='order-image-title'>合同图片：</span>);
        }

        if (invoiceImages.length > 0) {
            invoiceImages.unshift(<span key='invoice-image-title' className='order-image-title'>发票图片：</span>);
        }

        return <tr key={order.orderId}>
            <td className={className}>
                <div>企业 名称: {order.enterpriseName}</div>
                <div>企业编号: {order.requirementId}</div>
                {uploadComponent}
                <div className='order-images'>
                    {contractImages}
                </div>
                <div className='order-images'>
                    {invoiceImages}
                </div>
            </td>
            < td className='no-border'>
                {action}
            </td>
        </tr>
    }


    getUploadComponenet(orderId, state) {
        let label = null;
        if (state === 1) {
            label = '请上传合同扫描件';
            return <FileUploadComponent label = {label} componentId={orderId} uploadImages={(images) => {
                this.props.uploadOrdersImage(this.props.trade.tradeId, orderId, 1, images)
            } }/>
        } else if (state === 4) {
            label = '请上传发票扫描件';
            return <FileUploadComponent label = {label} componentId={orderId} uploadImages={(images) => {
                this.props.uploadOrdersImage(this.props.trade.tradeId, orderId, 2, images)
            } }

                showBigPicture={(url) => {
                    this.showBigPicture.bind(this);
                } }/>
        }
        return null;
    }


    getCurrentStateById(id) {
        let state = '签署合同'
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

    showBigPicture(e, imgurl){
        $(e).closest('.trade-node').addClass('show-big-picture');
        
    }
}

module.exports = Trade;