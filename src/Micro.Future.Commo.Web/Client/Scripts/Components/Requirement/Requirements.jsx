import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import Masonry from 'react-masonry-component';
import {fetchRequirements, fetchChains} from '../../Actions';

const masonryOptions = {
    transitionDuration: 1
};

class Requirements extends React.Component {

    constructor(props) {
        super(props);
        this.getRequirement = this.getRequirement.bind(this);
    }

    componentWillMount() {
        this.props.fetchRequirements();
    }

    render() {
        const {requirements} = this.props;
        return <div className='requirement-list'>
            {requirements && requirements.length > 0 ? <div className='title'>我的需求：</div> : null}
            <Masonry
                className={'my-gallery-class'} // default ''
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                {
                    requirements.map((requirement) => {
                        return this.getRequirement(requirement);
                    }) }
            </Masonry>
            <div className='clearfix'></div>
        </div>;
    }

    getRequirement(requirement) {
        if (!requirement) {
            return;
        }
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
        } = requirement;

        return <div key={requirementId} className='requirement'>
            <div className='requirement-items'>
                {enterpriseName ? <div className='requirement-item'><span className='title'>公司名称：</span><span>{enterpriseName}</span></div> : null}
                {type ? <div className='requirement-item'><span className='title'>需求类型：</span><span>{type === 1 ? '采购' : (type === 2 ? '销售' : '购销') }</span></div> : null}
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
            </div>
            <div className='operators'>
                <Link to={'/requirement/' + requirementId + '/chains'} className='btn' onClick={() => this.props.fetchChains(requirementId) }>查看匹配详情</Link>
            </div>
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        requirements: state.requirements
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRequirements: () => {
            dispatch(fetchRequirements());
        },
        fetchChains: (requirementId) => {
            dispatch(fetchChains(requirementId));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Requirements);