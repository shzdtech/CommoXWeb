import React from 'react';
import { connect } from 'react-redux';
import AcceptanceBankManager from '../../Components/Admin/AcceptanceBankManager';
import {changeAcceptanceBankInfo, submitAcceptanceBank, deleteAcceptanceBank, fetchAcceptanceBank} from '../../Actions/AdminActions';

const mapStateToProps = (state, ownProps) => {
    return {
        acceptanceBankInfo: state.admin.acceptanceBankInfo,
        acceptanceBankList: state.home.acceptanceBankList || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeForm: (key, newValue) => {
            dispatch(changeAcceptanceBankInfo(key, newValue));
        },
        onSubmit: (acceptanceBankInfo) => {
            dispatch(submitAcceptanceBank(acceptanceBankInfo));
        },
        onDelete: (id) => {
            dispatch(deleteAcceptanceBank(id));
        },
        fetchAcceptanceBank: () => {
            dispatch(fetchAcceptanceBank());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AcceptanceBankManager);