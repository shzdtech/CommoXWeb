import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import FormConfirmation from '../../Components/Form/FormConfirmation';
import {addRequirement} from '../../Actions/RequirementActions';

const mapStateToProps = (state, ownProps) => {
    return {
        forms: state.forms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitForm: (list, selectedType) => {
            dispatch(addRequirement(list, selectedType));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FormConfirmation);