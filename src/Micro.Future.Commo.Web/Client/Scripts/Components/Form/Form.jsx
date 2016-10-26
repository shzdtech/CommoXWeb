import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {Link} from 'react-router';
import RequirementType from '../../Models/RequirementType';
import FormType from './FormType';
import FormContent from './FormContent';

class Form extends React.Component {
    render() {
        const {main, selectedType, buy, sell, subsidy, createFor} = this.props.forms;
        let list = null;
        if (selectedType === RequirementType.Buy) {
            list = buy;
        } else if (selectedType === RequirementType.Sell) {
            list = sell;
        } else if (selectedType === RequirementType.Subsidy) {
            list = subsidy
        }

        let back = null;
        if (createFor === 1) {
            back = <div className='back-to'><Link to="/createChain" className='btn'>返回</Link></div>
        }

        return <div className="forms">
            {back}
            <FormType main={main} selectedType={selectedType} changeFormType={this.props.changeFormType}/>
            <FormContent list={list} selectedType={selectedType} {...this.props.formContentActions} />
        </div>
    }
}

module.exports = Form;