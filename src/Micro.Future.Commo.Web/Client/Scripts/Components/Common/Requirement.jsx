import React from 'react';

class Requirement extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {requirementId,
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
            createTime
        } = this.props.requirement;

        return <div key={requirementId} className='requirement'>
            <div className='requirement-items'>
                {enterpriseName ? <div className='requirement-item main'><span className='title'>公司名称：</span><span>{enterpriseName}</span></div> : null}
                {type ? <div className='requirement-item main'><span className='title'>需求类型：</span><span>{type === 1 ? '采购' : (type === 2 ? '销售' : '购销') }</span></div> : null}
                {paymentAmount ? <div className='requirement-item'><span className='title'>资金金额: </span><span>{paymentAmount}</span></div> : null}
                {paymentDateTime ? <div className='requirement-item'><span className='title'>货款支付时间: </span><span>{paymentDateTime}</span></div> : null}
                {paymentType ? <div className='requirement-item'><span className='title'>支付方式: </span><span>{paymentType}</span></div> : null}
                {warehouseAccount ? <div className='requirement-item'><span className='title'>仓库开户: </span><span>{warehouseAccount}</span></div> : null}
                {productPrice ? <div className='requirement-item'><span className='title'>货物单价：</span><span>{productPrice}</span></div> : null}
                {productType ? <div className='requirement-item'><span className='title'>货物类型：</span><span>{productType}</span></div> : null}
                {productName ? <div className='requirement-item'><span className='title'>货物名称：</span><span>{productName}</span></div> : null}
                {productSpecification ? <div className='requirement-item'><span className='title'>货物规格：</span><span>{productSpecification}</span></div> : null}
                {productQuantity ? <div className='requirement-item'><span className='title'>货物数量：</span><span>{productQuantity}</span></div> : null}
                {productUnit ? <div className='requirement-item'><span className='title'>货物单位：</span><span>{productUnit}</span></div> : null}
                {tradeAmount ? <div className='requirement-item'><span className='title'>合同总金额：</span><span>{tradeAmount}</span></div> : null}
                {tradeProfit ? <div className='requirement-item'><span className='title'>合同利润：</span><span>{tradeProfit}</span></div> : null}
                {businessRange ? <div className='requirement-item'><span className='title'>业务范围：</span><span>{businessRange}</span></div> : null}
                {invoiceValue ? <div className='requirement-item'><span className='title'>开票量：</span><span>{invoiceValue}</span></div> : null}
                {invoiceIssueDateTime ? <div className='requirement-item'><span className='title'>发票开具时间：</span><span>{invoiceIssueDateTime}</span></div> : null}
                {invoiceTransferMode ? <div className='requirement-item'><span className='title'>发票交接方式：</span><span>{invoiceTransferMode}</span></div> : null}
                {createTime ? <div className='requirement-item'><span className='title'>创建时间：</span><span>{new Date(createTime).toLocaleString() }</span></div> : null}
            </div>
            <div className='operators'>
                {this.props.children}
            </div>
        </div>;
    }
}

module.exports = Requirement;