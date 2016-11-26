import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import FormConfirmation from '../../Components/Form/FormConfirmation';
import {addRequirement} from '../../Actions/RequirementActions';
import {getAllEnterprise, changeEnterpriseSelection} from '../../Actions/AccountActions';


const mapStateToProps = (state, ownProps) => {
    return {
        forms: state.forms,
        enterpriseList: state.account.enterpriseList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitForm: (list, selectedType, enterpriseId) => {
            dispatch(addRequirement(list, selectedType, enterpriseId));
        },
        fetchEnterpriseList: () => {
            dispatch(getAllEnterprise());
        },
        onChangeEnterpriseSelection: (key, newValue) => {
            dispatch(changeEnterpriseSelection(key, newValue));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FormConfirmation);