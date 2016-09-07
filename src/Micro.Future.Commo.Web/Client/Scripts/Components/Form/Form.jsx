import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RequirementType from '../../Models/RequirementType';
import FormType from './FormType';
import FormContent from './FormContent';

class Form extends React.Component {
    render() {
        const {main, selectedType, buy, sell, subsidy} = this.props.forms;
        let list = null;
        if (selectedType === RequirementType.Buy) {
            list = buy;
        } else if (selectedType === RequirementType.Sell) {
            list = sell;
        } else if (selectedType === RequirementType.Subsidy) {
            list = subsidy
        }

        return <div className="forms">
            <FormType main={main} selectedType={selectedType} changeFormType={this.props.changeFormType}/>
            <FormContent list={list} selectedType={selectedType} {...this.props.formContentActions} />
        </div>
    }
}

module.exports = Form;