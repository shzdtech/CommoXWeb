import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {addRequirement, resetForm} from '../../Actions';
import InputFormItem from './InputFormItem';
import FormItem from './FormItem';
import FilterProperty from '../../Models/FilterProperty';
import {TEXT} from '../../Constants/FilterTypes';
import {Link} from 'react-router';

class FormContent extends React.Component {
    render() {

        const {list, selectedType} = this.props;

        let requirements = [];
        let rules = [];
        list.forEach((l) => {
            if (!l.selected) {
                if (l.filterProperty === FilterProperty.Requirement) {
                    requirements.push(l);
                } else if (l.filterProperty === FilterProperty.Rule) {
                    rules.push(l);
                }
            }
        });

        let requirementList = null;
        let ruleList = null;
        if (requirements.length > 0) {
            requirementList = <div className='form-content-group'>
                <div className='title'>需求属性：</div>
                <div className='form-item-list'>
                    {requirements.map(function (r) {
                            if (r.type === TEXT) {
                                return <InputFormItem key={r.id} formItem = {r} />;
                            }
                            return <FormItem key={r.id} formItem = {r} />;
                    }) }
                </div>
            </div>
        }

        if (rules.length > 0) {
            ruleList = <div className='form-content-group'>
                <div className='title'>附加需求：</div>
                <div className='form-item-list'>{
                    rules.map(function (r) {
                        if ( r.filterProperty === FilterProperty.Rule) {
                            if (r.type === TEXT) {
                                return <InputFormItem key={r.id} formItem = {r} />;
                            }
                            return <FormItem key={r.id} formItem = {r} />;
                        }
                    }) }
                </div>
            </div>
        }

        return <div className='form-content'>
            {requirementList}
            {ruleList}
            {requirements.length > 0 ? <div className="operators"> 
                <Link to="/formConfirm" className='btn'>确定</Link>
                <span className='btn calloff' onClick={()=>this.props.resetForm()}>取消</span></div> : null}
        </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitForm: (list, selectedType) => {
            dispatch(addRequirement(list, selectedType));
        },
        resetForm: ()=>{
            dispatch(resetForm());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FormContent);