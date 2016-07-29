import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import InputFilter from './InputFilter';
import {removeFilter, toggleFilterList} from '../Actions';
import {TEXT} from '../Constants/FilterTypes';

class FilterList extends React.Component {
    render() {
        const {filters, isIn, onRemoveFilterClick, onToggleFilterList} = this.props;

        let list = filters.map(function (filter) {
            if (!filter.selected) {
                if (filter.type === TEXT) {
                    return <InputFilter key={filter.id} filter = {filter} />
                }
                return <Filter key={filter.id} filter = {filter} />
            }
        });

        let selectedFilters = filters.filter((f) => {
            return f.selected
        });

        let selected = selectedFilters.map((filter) => {
            if (filter.selectedItems) {
                let names = filter.selectedItems.map((item) => {
                    return item.name;
                });
                return <span className='selected-filter'>
                    {filter.title + ': ' + names.join(', ') }
                    <span className="glyphicon glyphicon-remove filter-remove" aria-hidden="true" onClick={
                        () => onRemoveFilterClick(filter)
                    }></span>
                </span>
            }
        });

        return <div>
            <div className='btn filter-btn' onClick={onToggleFilterList}>筛选</div>
            <div className={ 'filter-content' + (isIn ? ' in' : '')}>
                <span className="glyphicon glyphicon-remove close" aria-hidden="true" onClick={onToggleFilterList}></span>
                <div className='selected-filter-container'>
                    <span>所有〉</span>{selected}
                </div>
                <ul>
                    {list}
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
        onToggleFilterList:()=>{
            dispatch(toggleFilterList());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FilterList);