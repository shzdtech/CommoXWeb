import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import BillTrade from '../../Components/Trade/BillTrade';
import {setPaymentMethod} from '../../Actions/RequirementActions';
import {fetchFinance, fetchAcceptance} from '../../Actions/AdminActions';

const mapStateToProps = (state, ownProps) => {
    return {
        acceptanceList: state.home.acceptanceList || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
        fetchAcceptance : () => {
            dispatch(fetchAcceptance());
        },
        startBillTrade: ()=>{
            dispatch(setPaymentMethod(2));
            dispatch(push('addRequirement'));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(BillTrade);