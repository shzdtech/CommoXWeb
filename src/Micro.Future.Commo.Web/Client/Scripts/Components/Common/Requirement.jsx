import React from 'react';
import {paymentTypesEnum, invoiceValuesEnum, enterpriseTypesEnum, paymentRiskControlEnum} from '../../Models/EnumHelper';
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
            paymentRiskControl,
            paymentBankName,
            paymentBankAccount,
            paymentBankId,
            paymentBankAddress,
            isAcceptanceBillETicket,
            productType,
            productName,
            productSpecification,
            productQuantity,
            productPrice,
            productUnit,
            productTransferMode,
            eWarehouseReceipt,
            warehouseAccount,
            warehouseAddress1,
            tradeAmount,
            tradeProfit,
            invoiceValue,
            invoicedQuantity,
            invoiceRequirement,
            invoiceIssueDateTime,
            invoiceTransferMode,
            businessRange,
            createTime,

            expanded,
        } = this.props.requirement;

        let count = 0;
        for(var key in this.props.requirement){
            if(this.props.requirement[key]){
                count++;
            }
        }

        let expandClassName = expanded ? 'expanded' : '';
        return <div key={requirementId} className='requirement'>
            <div className={'requirement-items ' + expandClassName}>
                {this.props.requirement.state === 0 ? <span className='glyphicon glyphicon-trash' onClick={() => this.props.deleteRequirement(requirementId) }></span> : null}
                <div className='requirement-item main'><span className='title'>需求编号: </span><span>{requirementId}</span></div>
                {type ? <div className='requirement-item main'><span className='title'>需求类型：</span><span>{type === 1 ? '采购' : (type === 2 ? '销售' : '购销') }</span></div> : null}
                {enterpriseName ? <div className='requirement-item'><span className='title'>公司名称：</span><span>{enterpriseName}</span></div> : null}
                {paymentAmount ? <div className='requirement-item'><span className='title'>资金金额: </span><span>{paymentAmount}</span></div> : null}
                {tradeAmount ? <div className='requirement-item'><span className='title'>合同总金额：</span><span>{tradeAmount}</span></div> : null}
                {productName ? <div className='requirement-item'><span className='title'>货物名称：</span><span>{productName}</span></div> : null}
                {productPrice ? <div className='requirement-item'><span className='title'>货物单价：</span><span>{productPrice}</span></div> : null}
                {paymentDateTime ? <div className='requirement-item'><span className='title'>货款支付时间: </span><span>{paymentDateTime}</span></div> : null}
                {paymentType ? <div className='requirement-item'>
                    <span className='title'>支付方式: </span><span>{paymentTypesEnum[paymentType]}</span>
                </div> : null}
                {paymentRiskControl ? <div className='requirement-item'>
                    <span className='title'>支付风控: </span><span>{paymentRiskControlEnum[paymentRiskControl]}</span>
                </div> : null}
                {paymentBankName ? <div className='requirement-item'>
                    <span className='title'>开户银行名称: </span><span>{paymentBankName}</span>
                </div> : null}
                {paymentBankAccount ? <div className='requirement-item'>
                    <span className='title'>银行帐号: </span><span>{paymentBankAccount}</span>
                </div> : null}
                {paymentBankId ? <div className='requirement-item'>
                    <span className='title'>银行行号: </span><span>{paymentBankId}</span>
                </div> : null}
                {paymentBankAddress ? <div className='requirement-item'>
                    <span className='title'>开户行地址: </span><span>{paymentBankAddress}</span>
                </div> : null}
                {isAcceptanceBillETicket !== null ? <div className='requirement-item'>
                    <span className='title'>已开通电子票口: </span><span>{isAcceptanceBillETicket ? '是' : '否'}</span>
                </div> : null}
                {productType ? <div className='requirement-item'><span className='title'>货物类型：</span><span>{productType}</span></div> : null}
                {productSpecification ? <div className='requirement-item'><span className='title'>货物规格：</span><span>{productSpecification}</span></div> : null}
                {productQuantity ? <div className='requirement-item'><span className='title'>货物数量：</span><span>{productQuantity}</span></div> : null}
                {productUnit ? <div className='requirement-item'><span className='title'>货物单位：</span><span>{productUnit}</span></div> : null}
                {productTransferMode ? <div className='requirement-item'>
                    <span className='title'>货物交接方式：</span><span>{productTransferMode}</span></div> : null}
                {eWarehouseReceipt ? <div className='requirement-item'>
                    <span className='title'>电子仓单: </span><span>{eWarehouseReceipt}</span></div> : null}
                {warehouseAccount ? <div className='requirement-item'>
                    <span className='title'>仓库开户: </span><span>{warehouseAccount}</span></div> : null}
                {warehouseAddress1 ? <div className='requirement-item'>
                    <span className='title'>仓库地址: </span><span>{warehouseAddress1}</span></div> : null}
                {tradeProfit ? <div className='requirement-item'><span className='title'>合同利润：</span><span>{tradeProfit}</span></div> : null}
                {businessRange ? <div className='requirement-item'><span className='title'>业务范围：</span><span>{businessRange}</span></div> : null}
                {invoiceValue ? <div className='requirement-item'><span className='title'>开票面额：</span><span>{invoiceValuesEnum[invoiceValue]}</span></div> : null}
                {invoicedQuantity ? <div className='requirement-item'><span className='title'>开票量：</span><span>{invoicedQuantity}</span></div> : null}
                {invoiceRequirement ? <div className='requirement-item'><span className='title'>开票要求：</span><span>{invoiceRequirement}</span></div> : null}
                {invoiceIssueDateTime ? <div className='requirement-item'><span className='title'>发票开具时间：</span><span>{invoiceIssueDateTime}</span></div> : null}
                {invoiceTransferMode ? <div className='requirement-item'><span className='title'>发票交接方式：</span><span>{invoiceTransferMode}</span></div> : null}
                {createTime ? <div className='requirement-item'><span className='title'>创建时间：</span><span>{new Date(createTime).toLocaleString() }</span></div> : null}
           
                {count > 8 ? <div className="gradient-back"></div> : null}
                {count > 8 ? <span className='glyphicon glyphicon-menu-up' onClick={() => this.props.updateExpandState(requirementId, false) }></span> : null}
                {count > 8 ? <span className='glyphicon glyphicon-menu-down' onClick={() => this.props.updateExpandState(requirementId, true) }></span> : null}
            </div>
            <div className='operators'>
                {this.props.children}
            </div>
        </div>;
    }
}

module.exports = Requirement;