import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
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
            <FormType main={main} selectedType={selectedType}/>
            <FormContent list={list} selectedType={selectedType} />
        </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        forms: state.forms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Form);