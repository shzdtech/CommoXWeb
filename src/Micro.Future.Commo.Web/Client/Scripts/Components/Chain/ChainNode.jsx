import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {} from '../../Actions';

class ChainNode extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {requirement} = this.props;
        let {requirementId,
            enterpriseId,
            enterpriseName,
            type,
            productType,
            productName,
            productSpecification,
            productPrice,
            productQuantity,
            productUnit,
            tradeAmount
        } = requirement;
        return (<div className='chain-node'>
            {enterpriseId ? <div className='title'><span>企业编号：</span><span>{enterpriseId}</span></div> : null}
            <div className='title'>{enterpriseName}</div>
            {type ? <div className='title'><span>需求类型：</span><span>{type === 1 ? '出资' : type === 2 ? '出货' : '补贴'}</span></div> : null}
            {productType ? <div className='sub-title'><span>货物类型：</span><span>{productType}</span></div> : null}
            {productName ? <div className='sub-title'><span>货物名称：</span><span>{productName}</span></div> : null}
            {productSpecification ? <div className='sub-title'><span>货物规格：</span><span>{productSpecification}</span></div> : null}
            {productPrice ? <div className='sub-title'><span>货物单价：</span><span>{productPrice}</span></div> : null}
            {productQuantity ? <div className='sub-title'><span>货物数量：</span><span>{productQuantity}</span></div> : null}
            {productUnit ? <div className='sub-title'><span>货物单位：</span><span>{productUnit}</span></div> : null}
            {tradeAmount ? <div className='sub-title'><span>交易量：</span><span>{tradeAmount}</span></div> : null}
            <div className='operators'>
                <span className='btn'>确认</span>
                <span className='btn'>拒绝</span>
            </div>
            <div className='operators-overlay'></div>
        </div>);
    }

}

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChainNode);