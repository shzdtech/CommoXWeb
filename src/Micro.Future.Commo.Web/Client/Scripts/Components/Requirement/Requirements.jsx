import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {fetchRequirements} from '../../Actions';

class Requirements extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchRequirements();
    }

    render() {
        const {requirements} = this.props;
        return <div>
            {requirements && requirements.length > 0 ? <div>我的需求：</div> : null}
            {
                requirements.map((requirement) => {
                    return getRequirement(requirement);
                })}
        </div>;
    }

    getRequirement(requirement) {
        if (!requirement) {
            return;
        }

        return <div key={requirement.id}>
            {requirement.enterpriseName ? <div><span>公司名称：</span><span>{requirement.enterpriseName}</span></div> : null}
            {requirement.type ? <div><span>需求类型：</span><span>{requirement.type === 1 ? '出资' : requirement === 2 ? '出货' : '补贴'}</span></div> : null}
            {requirement.productType ? <div><span>货物类型：</span><span>{requirement.productType}</span></div> : null}
            {requirement.productName ? <div><span>货物名称：</span><span>{requirement.productName}</span></div> : null}
            {requirement.productSpecification ? <div><span>货物规格：</span><span>{requirement.productSpecification}</span></div> : null}
            {requirement.productPrice ? <div><span>货物单价：</span><span>{requirement.productPrice}</span></div> : null}
            {requirement.productQuantity ? <div><span>货物数量：</span><span>{requirement.productQuantity}</span></div> : null}
            {requirement.productUnit ? <div><span>货物单位：</span><span>{requirement.productUnit}</span></div> : null}
            {requirement.tradeAmount ? <div><span>交易量：</span><span>{requirement.tradeAmount}</span></div> : null}
            <div className='operators'>
                <span className='btn'>查看匹配详情</span>
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
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Requirements);