import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FundTrade from '../../Components/Trade/FundTrade';
import {fetchFinance} from '../../Actions/AdminActions';
import {setPaymentMethod} from '../../Actions/RequirementActions';

const mapStateToProps = (state, ownProps) => {
    return {
        financeInfoList: state.home.financeInfoList || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFinance : () => {
            dispatch(fetchFinance());
        },
        startFundTrade: ()=>{
            dispatch(setPaymentMethod(1));
            dispatch(push('/addRequirement'));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FundTrade);