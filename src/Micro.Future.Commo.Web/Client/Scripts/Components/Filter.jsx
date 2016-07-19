import React from 'react';
import CheckBox from './CheckBox';

class Filter extends React.Component {
    constructor(){
        super();
        this.state = {
            isCollapsed: false,
            isMultipleSelected: false
        };
        this.handleCollapseClick = this.handleCollapseClick.bind(this);
        this.handleMultipleSelectedClick = this.handleMultipleSelectedClick.bind(this);
        this.handleCancelMultipleSelectedClick = this.handleCancelMultipleSelectedClick.bind(this);
    }

    handleCollapseClick(){
        this.state.isCollapsed = !this.state.isCollapsed;
        this.state.isMultipleSelected = false;
        this.setState(this.state);
    }

    handleMultipleSelectedClick(){
        this.state.isMultipleSelected = true;
        this.state.isCollapsed = true;
        this.setState(this.state);
    }

    handleCancelMultipleSelectedClick(){
        this.state.isMultipleSelected = false;
        this.state.isCollapsed = false;
        this.setState(this.state);
    }

    render(){
        let items =  this.props.items.map(function(item) {
            return <li key={item.id}>
                <a>
                    <CheckBox className='filter-checkbox' />
                    <span>{item.name}</span>
                </a>
            </li>;
        });
        let rightSelector = null,
            operators = null,
            filterClassName = 'filter-category';

        if(this.state.isCollapsed){
            filterClassName = filterClassName + ' collapsed';
        }

        if(this.state.isMultipleSelected){
            filterClassName = filterClassName + ' multiple-selected'
        }

        if(this.props.multipleSelection){
            rightSelector = <div className='right-selector'>
                <span className='multiply' onClick={this.handleMultipleSelectedClick}>多选</span>
                <span className='togglebtn more' onClick={this.handleCollapseClick}>更多</span>
                <span className='togglebtn retract' onClick={this.handleCollapseClick}>收起</span>
            </div>;
            operators = <div className='operator-btn'>
                <span className='multiply-submit'>提交</span>
                <span className='calloff' onClick={this.handleCancelMultipleSelectedClick}>取消</span>
            </div>;
        }

        return <li className={filterClassName}>
           <span className='title'>{this.props.title + ':'}</span>
           <ul className='items'>
              {items}
           </ul>
        {rightSelector}
        {operators}
        </li>;
    }
};

module.exports = Filter;