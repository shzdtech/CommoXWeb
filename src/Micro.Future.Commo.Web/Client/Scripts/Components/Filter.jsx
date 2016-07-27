import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import {toggleFilterMutipleSelection,
    toggleFilterCollapse,
    selectFilter,
    checkItem} from '../Actions';
import CheckBox from './CheckBox';

class Filter extends React.Component {
    constructor(){
        super();
        this.handleFilterSelection = this.handleFilterSelection.bind(this);
        this.handItemChecked = this.handItemChecked.bind(this);
        this.handleMultipleSelectionSubmit = this.handleMultipleSelectionSubmit.bind(this);
    }

    handleFilterSelection(item){
        const {filter, onFilterSelected} = this.props;
        onFilterSelected(Object.assign({}, filter, {selectedItems: [item]}));
    }

    handItemChecked(isChecked, item){
         event.stopPropagation(); 
         const {filter, onItemChecked} = this.props;
         onItemChecked(isChecked, filter, item);
    }

    handleMultipleSelectionSubmit(){
        const {filter, onFilterSelected, onToggleMultipleSelectedClick} = this.props;
        if(filter.selectedItems && filter.selectedItems.length > 0){
            onFilterSelected(Object.assign({}, filter));
        }
    }

    render(){
        const { filter,
            isCollapsed,
            isMultipleSelected,
            onToggleMultipleSelectedClick,
            onCollapseClick } = this.props;

        let rightSelector = null,
            operators = null,
            filterClassName = 'filter-category';

        if(filter.isCollapsed){
            filterClassName = filterClassName + ' collapsed';
        }

        if(filter.isMultipleSelected){
            filterClassName = filterClassName + ' multiple-selected';
        }

        if(filter.multipleSelection){
            rightSelector = <div className='right-selector'>
                <span className='btn multiply' onClick={() => onToggleMultipleSelectedClick(filter)}>多选</span>
                <span className='btn togglebtn more' onClick={() => onCollapseClick(filter)}>更多</span>
                <span className='btn togglebtn retract' onClick={() => onCollapseClick(filter)}>收起</span>
            </div>;
            operators = <div className='operator-btn'>
                <span className='btn multiply-submit' onClick={this.handleMultipleSelectionSubmit}>提交</span>
                <span className='btn calloff' onClick={()=>onToggleMultipleSelectedClick(filter)}>取消</span>
            </div>;
        }

        return <li className={filterClassName}>
           <span className='title'>{filter.title + ':'}</span>
           <ul className='items'>
              {this.props.filter.items.map((item) => {
                return  <li key={item.id}>
                  <a>
                      <CheckBox className='filter-checkbox' onChecked={(isChecked) => this.handItemChecked(isChecked, item)}/>
                      <span onClick={() => this.handleFilterSelection(item)}>{item.name}</span>
                  </a>
                 </li>;
              })}
           </ul>
        {rightSelector}
        {operators}
        </li>;
    }
}

Filter.propTypes = {
    filter: PropTypes.object.isRequired,
    onCollapseClick: PropTypes.func.isRequired,
    onItemChecked: PropTypes.func.isRequired,
    onToggleMultipleSelectedClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleMultipleSelectedClick: (filter) => {
            dispatch(toggleFilterMutipleSelection(filter));
        },
        onCollapseClick: (filter) => {
            dispatch(toggleFilterCollapse(filter));
        },
        onFilterSelected:(filter) => {
            dispatch(selectFilter(filter));
        },
        onItemChecked:(isChecked, filter, item) =>{
             dispatch(checkItem(isChecked, filter, item));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);