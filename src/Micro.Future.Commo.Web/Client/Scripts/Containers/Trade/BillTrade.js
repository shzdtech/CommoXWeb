import React from 'react';
import { connect } from 'react-redux';
import BillTrade from '../../Components/Trade/BillTrade';
import {fetchAcceptance} from '../../Actions/AdminActions';

const mapStateToProps = (state, ownProps) => {
    return {
        acceptanceList: state.home.acceptanceList || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAcceptance : () => {
            dispatch(fetchAcceptance());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(BillTrade);