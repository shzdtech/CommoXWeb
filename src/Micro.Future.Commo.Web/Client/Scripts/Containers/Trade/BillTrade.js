import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import BillTrade from '../../Components/Trade/BillTrade';
import {setPaymentMethod} from '../../Actions/RequirementActions';

const mapStateToProps = (state, ownProps) => {
    return {
       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
        startBillTrade: ()=>{
            dispatch(setPaymentMethod(4));
            dispatch(push('addRequirement'));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(BillTrade);