import React from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import Dropdown from './Dropdown';
import {changeEnterpriseInfo} from '../../Actions';

class Register extends React.Component {
    constructor() {
        super();
    }

    render() {
        let list = [];
        const {enterpriseInfo, onChangeEnterpriseForm} = this.props;
        for (var key in enterpriseInfo) {
            if (enterpriseInfo[key].type === 'text' || enterpriseInfo[key].type === 'date' || enterpriseInfo[key].type === 'number') {
                list.push(<Input info={enterpriseInfo[key]} onChangeEnterpriseForm={onChangeEnterpriseForm} />);
            } else if (enterpriseInfo[key].type === 'select') {
                list.push(<Dropdown info={enterpriseInfo[key]} onChangeEnterpriseForm={onChangeEnterpriseForm} />);
            }
        }
        return <div>
            {list}
        </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        enterpriseInfo: state.register
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeEnterpriseForm: (key, newValue) => {
            dispatch(changeEnterpriseInfo(key, newValue))
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Register);