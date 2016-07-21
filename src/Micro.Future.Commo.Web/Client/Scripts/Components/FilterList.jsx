import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import {removeFilter} from '../Actions';

class FilterList extends React.Component{
    render() {
        var list = this.props.filters.map(function(filter) {
            return <Filter filter = {filter} />
            });

        var selectedFilters = this.props.filters.filter((f)=>{
            return f.selected
        });
        
        var selected = selectedFilters.map((filter) => {
            var names = filter.selectedItems.map((item)=>{
                return item.name;
            });
            return <span className='selected-filter'>
            {filter.title + ': ' + names.join(', ')}
            <span className="glyphicon glyphicon-remove filter-remove" aria-hidden="true" onClick={
                ()=>this.props.onRemoveFilterClick(filter)
            }></span>
            </span>
        });

        return <div>
        <div className='selected-filter-container'>
             <span>所有〉</span>{selected}
        </div>
        <ul>
        {list}
        </ul>
        </div>
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        filters: [...state.filters]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveFilterClick: (filter) => {
            dispatch(removeFilter(filter));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FilterList);