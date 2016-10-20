import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import FormConfirmation from '../../Components/Form/FormConfirmation';
import {addRequirement} from '../../Actions/RequirementActions';
import {getAllEnterprise} from '../../Actions/AccountActions';

const mapStateToProps = (state, ownProps) => {
    return {
        forms: state.forms,
        enterpriseList: state.account.enterpriseList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitForm: (list, selectedType) => {
            dispatch(addRequirement(list, selectedType));
        },
        fetchEnterpriseList: () => {
            dispatch(getAllEnterprise());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FormConfirmation);