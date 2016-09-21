import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {confirmChain} from '../../Actions';

class ChainNode extends React.Component {
    constructor() {
        super();
        this.confirmChain = this.confirmChain.bind(this);
    }

    render() {
        let {requirement, chain, index} = this.props;
        let {requirementId,
            enterpriseId,
            enterpriseName,
            type,
            paymentAmount,
            paymentDateTime,
            paymentType,
            warehouseAccount,
            productPrice,
            productType,
            productName,
            productSpecification,
            productQuantity,
            productUnit,
            warehouseAddress1,
            tradeAmount,
            tradeProfit,
            businessRange,
            invoiceValue,
            invoiceIssueDateTime,
            invoiceTransferMode,
            accept
        } = requirement;

        let isMyRequest = false;//temp, will remove if not used in the future
        let operators = null;
        let operatorsOverlay = null;
        // if (isMyRequest && !chain.reject && !accept) {
        //     operators = <div className='operators'>
        //         <span className='btn btn-large' onClick={() => this.confirmChain(chain.chainId, requirementId, true) }>确认</span>
        //         <span className='btn btn-large' onClick={() => this.confirmChain(chain.chainId, requirementId, false) }>拒绝</span>
        //     </div>
        //     operatorsOverlay = <div className='operators-overlay'></div>
        // }
        if (chain.chainStatus === 1) {
            operators = <div className='operators'>
                <span className='btn btn-large' onClick={() => this.props.getRequirementReplacement(chain.chainId, index, requirementId) }>替换</span>
            </div>
            operatorsOverlay = <div className='operators-overlay'></div>
        }

        return (<div className={!chain.reject && accept ? 'chain-node accept' : 'chain-node'}>
            {enterpriseId ? <div className='title'><span>企业编号：</span><span>{enterpriseId}</span></div> : null}
            <div className='title'>{enterpriseName}</div>
            {type ? <div className='title'><span className='title'>需求类型：</span><span>{type === 1 ? '采购' : (type === 2 ? '销售' : '购销') }</span></div> : null}
            {paymentAmount ? <div className='sub-title'><span>资金金额: </span><span>{paymentAmount}</span></div> : null}
            {paymentDateTime ? <div className='sub-title'><span>货款支付时间: </span><span>{paymentDateTime}</span></div> : null}
            {paymentType ? <div className='sub-title'><span>支付方式: </span><span>{paymentType}</span></div> : null}
            {warehouseAccount ? <div className='sub-title'><span>仓库开户: </span><span>{warehouseAccount}</span></div> : null}
            {productPrice ? <div className='sub-title'><span>货物单价：</span><span>{productPrice}</span></div> : null}
            {productType ? <div className='sub-title'><span>货物类型：</span><span>{productType}</span></div> : null}
            {productName ? <div className='sub-title'><span>货物名称：</span><span>{productName}</span></div> : null}
            {productSpecification ? <div className='sub-title'><span>货物规格：</span><span>{productSpecification}</span></div> : null}
            {productQuantity ? <div className='sub-title'><span>货物数量：</span><span>{productQuantity}</span></div> : null}
            {productUnit ? <div className='sub-title'><span>货物单位：</span><span>{productUnit}</span></div> : null}
            {tradeAmount ? <div className='sub-title'><span>合同总金额：</span><span>{tradeAmount}</span></div> : null}
            {tradeProfit ? <div className='sub-title'><span>合同利润：</span><span>{tradeProfit}</span></div> : null}
            {businessRange ? <div className='sub-title'><span>业务范围：</span><span>{businessRange}</span></div> : null}
            {invoiceValue ? <div className='sub-title'><span>开票量：</span><span>{invoiceValue}</span></div> : null}
            {invoiceIssueDateTime ? <div className='sub-title'><span>发票开具时间：</span><span>{invoiceIssueDateTime}</span></div> : null}
            {invoiceTransferMode ? <div className='sub-title'><span>发票交接方式：</span><span>{invoiceTransferMode}</span></div> : null}
            {operators}
            {operatorsOverlay}
        </div>);
    }

    confirmChain(chainId, requirementId, accept) {
        this.props.confirmChain(chainId, requirementId, accept);
    }

}

module.exports = ChainNode;