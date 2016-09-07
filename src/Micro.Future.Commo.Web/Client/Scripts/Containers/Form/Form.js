import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {changeFormType, resetForm, selectFormItem, typeFormItem} from '../../Actions';
import Form from '../../Components/Form/Form';

const mapStateToProps = (state, ownProps) => {
    return {
        forms: state.forms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeFormType: (formType) => {
            dispatch(changeFormType(formType));
        },
        formContentActions: {
            onSubmitForm: (list, selectedType) => {
                dispatch(addRequirement(list, selectedType));
            },
            resetForm: () => {
                dispatch(resetForm());
            },
            onFormItemSelected: (formItem, item) => {
                dispatch(selectFormItem(formItem, item));
            },
            onFormItemTyped: (formItem, value) => {
                dispatch(typeFormItem(formItem, value));
            },
            transferToConfirm: () => {
                dispatch(push('/formConfirm'));
            }
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Form);