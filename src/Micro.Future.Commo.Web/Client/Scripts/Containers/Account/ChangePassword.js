import React from 'react';
import { connect } from 'react-redux';
import ChangePassword from '../../Components/Account/ChangePassword'
//import {typeUserEmail, submitCreateUser} from '../../Actions';

const mapStateToProps = (state, ownProps) => {
    return {
        newUser: state.account.user,
        forms:　[{
            label: '原始密码',
            type: 'password',
            key: 'password',
            length: 'medium',
            placehodler: '原始密码'
        },{
            label: '新密码',
            type: 'password',
            key: 'password',
            length: 'medium',
            placehodler: '新密码'
        },{
            label: '确认新密码',
            type: 'password',
            key: 'password',
            length: 'medium',
            placehodler: '确认新密码'
        }]
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeForm: (key, newValue) => {
            //dispatch(typeUserEmail(newValue.value));
        },
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ChangePassword);