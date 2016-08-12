import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Filter from '../Filter';
import InputFilter from '../InputFilter';
import {TEXT} from '../../Constants/FilterTypes';
import FilterProperty from '../../Models/FilterProperty';
import {addRequirement} from '../../Actions';

class Requirement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {selectedFilters, addRequirement} = this.props;
        let selectedRequirements = [];
        let selectedRules = [];
        selectedFilters.forEach((filter) => {
            if (filter.filterProperty === FilterProperty.Requirement) {
                selectedRequirements.push(filter);
            } else if (filter.filterProperty === FilterProperty.Rule) {
                selectedRules.push(filter);
            }
        });

        let action = (r) => {
            let names = r.selectedItems.map((item) => {
                return item.name;
            });
            return <div key={r.id} className='requirement'>
                <span className='title'>
                    {r.title + ':'}
                </span>
                <span className="content">
                    { names.join(', ') }
                </span>
            </div>
        }

        let order = null;
        let extra = null;
        if (selectedRules.length > 0) {
            extra = <div>
                <div className='category'>附加属性</div>
                { selectedRules.map((r) => { return action(r) }) }
            </div>
        }

        if (selectedRequirements.length > 0) {
            order = <div className='requirements'>
                <div>
                    <div className='category'>需求属性</div>
                    { selectedRequirements.map((r) => { return action(r) }) }
                    {extra}
                    <div className='operators'>
                        <span className='btn multiply-submit' onClick={() => addRequirement(selectedFilters)}>提交</span>
                        <span className='btn calloff'>取消</span>
                    </div>
                </div>
            </div>
        }
        return order;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selectedFilters: state.filters.filter((f) => { return f.selected })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRequirement: (selectedFilters) => dispatch(addRequirement(selectedFilters))
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Requirement);