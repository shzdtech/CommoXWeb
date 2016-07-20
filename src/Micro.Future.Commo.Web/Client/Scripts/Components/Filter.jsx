import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import {toggleFilterMutipleSelection,
    toggleFilterCollapse,
    addFilter} from '../Actions'
import CheckBox from './CheckBox';

class Filter extends React.Component {
    constructor(){
        super();
        this.handleFilterSelection = this.handleFilterSelection.bind(this);
    }

    handleFilterSelection(item){
        const {filter, onFilterSelected} = this.props;
        onFilterSelected({
            id: filter.id,
            title: filter.title,
            items: [item]
        })
    }

    render(){
        const { filter,
            selectedFilters,
            isCollapsed,
            isMultipleSelected,
            multipleSelection,
            onToggleMultipleSelectedClick,
            onCollapseClick } = this.props;

        let filtered = selectedFilters.filter((selectedFilter)=>{return selectedFilter.id === filter.id});
        if(filtered.length > 0)
        {
            return null;
        }

        let rightSelector = null,
            operators = null,
            filterClassName = 'filter-category';

        if(isCollapsed){
            filterClassName = filterClassName + ' collapsed';
        }

        if(isMultipleSelected){
            filterClassName = filterClassName + ' multiple-selected'
        }

        if(multipleSelection){
            rightSelector = <div className='right-selector'>
                <span className='multiply' onClick={onToggleMultipleSelectedClick}>多选</span>
                <span className='togglebtn more' onClick={onCollapseClick}>更多</span>
                <span className='togglebtn retract' onClick={onCollapseClick}>收起</span>
            </div>;
            operators = <div className='operator-btn'>
                <span className='multiply-submit'>提交</span>
                <span className='calloff' onClick={onToggleMultipleSelectedClick}>取消</span>
            </div>;
        }

        return <li className={filterClassName}>
           <span className='title'>{filter.title + ':'}</span>
           <ul className='items'>
              {this.props.filter.items.map((item) => {
                  return <li key={item.id}>
                  <a onClick={() => this.handleFilterSelection(item)}>
                      <CheckBox className='filter-checkbox' />
                      <span>{item.name}</span>
                  </a>
                 </li>;
              })}
           </ul>
        {rightSelector}
        {operators}
        </li>;
    }
};

Filter.propTypes

const mapStateToProps = (state, ownProps) => {
    return {
        isCollapsed: state.filterStatus.isCollapsed,
        isMultipleSelected: state.filterStatus.isMultipleSelected,
        selectedFilters: [...state.filters]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleMultipleSelectedClick: () => {
            dispatch(toggleFilterMutipleSelection());
        },
        onCollapseClick: () => {
            dispatch(toggleFilterCollapse());
        },
        onFilterSelected:(filter) =>{
            dispatch(addFilter(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);