import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {selectFilter,
    typeItem} from '../Actions';

class InputFilter extends React.Component {
    constructor() {
        super();
        this.onSumited = this.onSumited.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    render() {
        let {filter} = this.props;
        return <li className='filter-category input-filter'>
            <span className='title'>{filter.title + ':'}</span>
            <input type='text' onChange={(e) => { this.handleValueChange(e) } }></input>
            <span className='btn submit-filter' onClick={this.onSumited}>提交</span>
        </li>
    }

    handleValueChange(e) {
        this.props.onItemTyped(this.props.filter, { id: 1, name: e.target.value })
    }

    onSumited() {
        if (this.props.filter.selectedItems && this.props.filter.selectedItems.length > 0) {
            this.props.onFilterSelected(this.props.filter);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilterSelected: (filter) => {
            dispatch(selectFilter(filter));
        },
        onItemTyped: (filter, item) => {
            dispatch(typeItem(filter, item));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputFilter);