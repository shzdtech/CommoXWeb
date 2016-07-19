import React from 'react';
import { connect } from 'react-redux';
import {toggleFilterMutipleSelection, toggleFilterCollapse} from '../Actions'
import CheckBox from './CheckBox';

class Filter extends React.Component {
    render(){
        let rightSelector = null,
            operators = null,
            filterClassName = 'filter-category';

        if(this.props.isCollapsed){
            filterClassName = filterClassName + ' collapsed';
        }

        if(this.props.isMultipleSelected){
            filterClassName = filterClassName + ' multiple-selected'
        }

        if(this.props.multipleSelection){
            rightSelector = <div className='right-selector'>
                <span className='multiply' onClick={this.props.onToggleMultipleSelectedClick}>多选</span>
                <span className='togglebtn more' onClick={this.props.onCollapseClick}>更多</span>
                <span className='togglebtn retract' onClick={this.props.onCollapseClick}>收起</span>
            </div>;
            operators = <div className='operator-btn'>
                <span className='multiply-submit'>提交</span>
                <span className='calloff' onClick={this.props.onToggleMultipleSelectedClick}>取消</span>
            </div>;
        }

        return <li className={filterClassName}>
           <span className='title'>{this.props.title + ':'}</span>
           <ul className='items'>
              {this.props.items.map(function(item) {
                  return <li key={item.id}>
                <a>
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

const mapStateToProps = (state, ownProps) => {
  return {
    isCollapsed: state.isCollapsed,
    isMultipleSelected: state.isMultipleSelected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleMultipleSelectedClick: () => {
      dispatch(toggleFilterMutipleSelection());
    },
    onCollapseClick: () => {
      dispatch(toggleFilterCollapse());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter);