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
        let {formItem, chains, onFormItemSelected, onReceiveChainList, confirmChain, manageChain} = this.props;
        return <div className='chain-list-manager-container'>
            <FormItem formItem={formItem} onFormItemSelected={onFormItemSelected} />
            <div className='chain-list-container'>
                <ChainList {...this.props}/>
            </div>
        </div>
    }

}

module.exports = ChainListManager;