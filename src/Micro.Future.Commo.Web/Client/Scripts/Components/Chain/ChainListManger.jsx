import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {selectChainListType, fetchChainsByType} from '../../Actions';
import ChainList from './ChainList';
import FormItem from '../Form/FormItem';

class ChainListManager extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.onFormItemSelected(this.props.formItem, this.props.formItem.items[0]);
    }

    render() {
        return <div className='chain-list-manager-container'>
            <FormItem formItem={this.props.formItem} onFormItemSelected={this.props.onFormItemSelected} />
            <div className='chain-list-container'>
                <ChainList />
            </div>
        </div>
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        formItem: state.chainListManager
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFormItemSelected: (formItem, item) => {
            dispatch(selectChainListType(item));
            dispatch(fetchChainsByType(item.value));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChainListManager);