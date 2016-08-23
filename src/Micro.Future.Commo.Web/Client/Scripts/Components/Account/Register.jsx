import React from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import Dropdown from './Dropdown';
import {changeEnterpriseInfo, registerEnterprise} from '../../Actions';

class Register extends React.Component {
    constructor() {
        super();
    }

    render() {
        let list = [];
        const {enterpriseInfo, onChangeEnterpriseForm, onSubmitEnterpriseForm} = this.props;
        for (var key in enterpriseInfo) {
            if (enterpriseInfo[key].type === 'text' || enterpriseInfo[key].type === 'date' || enterpriseInfo[key].type === 'number') {
                list.push(<Input key={key} info={enterpriseInfo[key]} onChangeEnterpriseForm={onChangeEnterpriseForm} />);
            } else if (enterpriseInfo[key].type === 'select') {
                list.push(<Dropdown key={key} info={enterpriseInfo[key]} onChangeEnterpriseForm={onChangeEnterpriseForm} />);
            }
        }
        return <div>
            {list}
            <div className='register-operators'>
                <span className='btn submit' onClick={()=>onSubmitEnterpriseForm(enterpriseInfo)}>提交</span>
                <span className='btn calloff' >取消</span>
            </div>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        enterpriseInfo: state.account.register
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeEnterpriseForm: (key, newValue) => {
            dispatch(changeEnterpriseInfo(key, newValue));
        },
        onSubmitEnterpriseForm: (enterpriseInfo) => {
            dispatch(registerEnterprise(enterpriseInfo));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Register);