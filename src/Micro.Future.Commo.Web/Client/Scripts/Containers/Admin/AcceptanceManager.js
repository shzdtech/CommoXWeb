import React from 'react';
import { connect } from 'react-redux';
import AcceptanceManager from '../../Components/Admin/AcceptanceManager';
import {changeAcceptanceInfo, submitAcceptance, deleteAcceptance, fetchAcceptance} from '../../Actions/AdminActions';

const mapStateToProps = (state, ownProps) => {
    return {
        acceptanceInfo: state.admin.acceptanceInfo,
        acceptanceList: state.home.acceptanceList || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeForm: (key, newValue) => {
            dispatch(changeAcceptanceInfo(key, newValue));
        },
        onSubmit: (acceptanceInfo) => {
            dispatch(submitAcceptance(acceptanceInfo));
        },
        onDelete: (id) => {
            dispatch(deleteAcceptance(id));
        },
        fetchAcceptance: () => {
            dispatch(fetchAcceptance());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AcceptanceManager);