import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {fetchRequirements, fetchChains} from '../../Actions';

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
            {requirements && requirements.length > 0 ? <div>我的需求：</div> : null}
            {
                requirements.map((requirement) => {
                    return this.getRequirement(requirement);
                }) }
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
            productType,
            productName,
            productSpecification,
            productPrice,
            productQuantity,
            productUnit,
            tradeAmount
        } = requirement;

        return <div key={requirementId} className='requirement'>
            <div className='requirement-items'>
                {enterpriseName ? <div className='requirement-item'><span className='title'>公司名称：</span><span>{enterpriseName}</span></div> : null}
                {type ? <div className='requirement-item'><span className='title'>需求类型：</span><span>{type === 1 ? '出资' : type === 2 ? '出货' : '补贴'}</span></div> : null}
                {productType ? <div className='requirement-item'><span className='title'>货物类型：</span><span>{productType}</span></div> : null}
                {productName ? <div className='requirement-item'><span className='title'>货物名称：</span><span>{productName}</span></div> : null}
                {productSpecification ? <div className='requirement-item'><span className='title'>货物规格：</span><span>{productSpecification}</span></div> : null}
                {productPrice ? <div className='requirement-item'><span className='title'>货物单价：</span><span>{productPrice}</span></div> : null}
                {productQuantity ? <div className='requirement-item'><span className='title'>货物数量：</span><span>{productQuantity}</span></div> : null}
                {productUnit ? <div className='requirement-item'><span className='title'>货物单位：</span><span>{productUnit}</span></div> : null}
                {tradeAmount ? <div className='requirement-item'><span className='title'>交易量：</span><span>{tradeAmount}</span></div> : null}
            </div>
            <div className='operators'>
                <span className='btn' onClick={()=>this.props.fetchChains(requirementId)}>查看匹配详情</span>
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