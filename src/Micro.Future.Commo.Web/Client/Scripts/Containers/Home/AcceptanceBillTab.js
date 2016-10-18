import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {fetchAcceptance} from '../../Actions/AdminActions';
import AcceptanceBillTab from '../../Components/Home/AcceptanceBillTab';

const mapStateToProps = (state, ownProps) => {
    return {
        acceptanceList: state.home.acceptanceList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAcceptanceList: () => {
            dispatch(fetchAcceptance());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AcceptanceBillTab);