import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import InputFilter from './InputFilter';
import {removeFilter, toggleFilterList} from '../Actions';
import {TEXT} from '../Constants/FilterTypes';
import FilterProperty from '../Models/FilterProperty';


class FilterList extends React.Component {
    render() {
        const {filters, isIn, onRemoveFilterClick, onToggleFilterList} = this.props;
        let selectedFilters = filters.filter((f) => {
            return f.selected
        });
        let requirements = [];
        let rules = [];
        filters.forEach((filter) => {
            if (!filter.selected) {
                if (filter.filterProperty === FilterProperty.Requirement) {
                    // if (!filter.parentFilterId || selectedFilters.filter((f) => {return f.id === filter.parentFilterId 
                    //     && f.selectedItems.filter((i)=>{return i.id === filter.parentItemId}).length > 0}).length > 0)
                        requirements.push(filter);
                } else if (filter.filterProperty === FilterProperty.Rule) {
                    rules.push(filter);
                }
            }
        });

        let requirementList = null;
        let ruleList = null;
        if (requirements.length > 0) {
            requirementList = <li>
                <ul>
                    {requirements.map((r) => {
                        if (!r.selected) {
                            if (r.type === TEXT) {
                                return <InputFilter key={r.id} filter = {r} />;
                            }
                            return <Filter key={r.id} filter = {r} />;
                        }
                    }) }
                </ul>
            </li>
        }

        if (rules.length > 0) {
            ruleList = <li>
                <ul>{
                    rules.map((filter) => {
                        if (!filter.selected && filter.filterProperty === FilterProperty.Rule) {
                            if (filter.type === TEXT) {
                                return <InputFilter key={filter.id} filter = {filter} />;
                            }
                            return <Filter key={filter.id} filter = {filter} />;
                        }
                    }) }
                </ul>
            </li>
        }

        let selected = selectedFilters.map((filter) => {
            if (filter.selectedItems) {
                let names = filter.selectedItems.map((item) => {
                    return item.name;
                });
                return <span key={filter.id} className='selected-filter'>
                    {filter.title + ': ' + names.join(', ') }
                    <span className="glyphicon glyphicon-remove filter-remove" aria-hidden="true" onClick={
                        () => {
                            onRemoveFilterClick(filter);
                        }
                    }></span>
                </span>
            }
        });

        return <div className='filter-container'>
            <div className='btn filter-btn' onClick={onToggleFilterList}>筛选</div>
            <div className={ 'filter-content' + (isIn ? ' in' : '') }>
                <div className='right-selector'>
                    <span className='btn togglebtn more' onClick={onToggleFilterList}>展开<span className='glyphicon glyphicon-chevron-down'></span></span>
                    <span className='btn togglebtn retract' onClick={onToggleFilterList}>收起<span className='glyphicon glyphicon-chevron-up'></span></span>
                </div>
                <span className="glyphicon glyphicon-remove close" aria-hidden="true" onClick={onToggleFilterList}></span>
                <div className='selected-filter-container'>
                    <span>所有〉</span>{selected}
                </div>
                <ul>
                    {requirementList}
                    {ruleList}
                </ul>
            </div>
            <div className='filter-content-overlay' onClick={onToggleFilterList}></div>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        filters: [...state.filters],
        isIn: state.filterContentToggled.isIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveFilterClick: (filter) => {
            dispatch(removeFilter(filter));
        },
        onToggleFilterList: () => {
            dispatch(toggleFilterList());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FilterList);