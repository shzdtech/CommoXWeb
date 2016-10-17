import React from 'react';
import { connect } from 'react-redux';
import AcceptanceManager from '../../Components/Admin/AcceptanceManager';
import {changeAcceptanceInfo, submitAcceptance} from '../../Actions/AdminActions';

const mapStateToProps = (state, ownProps) => {
    return {
        acceptanceInfo: state.admin.acceptanceInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeForm: (key, newValue) => {
            dispatch(changeAcceptanceInfo(key, newValue));
        },
        onSubmit: (acceptanceInfo) => {
            dispatch(submitAcceptance(acceptanceInfo));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AcceptanceManager);