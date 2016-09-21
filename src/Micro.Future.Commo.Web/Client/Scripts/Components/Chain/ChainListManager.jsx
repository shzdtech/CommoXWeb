import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {selectChainListType, fetchChainsByType} from '../../Actions';
import ChainList from './ChainList';
import ReplaceRequirementsPopup from './ReplaceRequirementsPopup';
import FormItem from '../Form/FormItem';

class ChainListManager extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.onFormItemSelected(this.props.formItem, this.props.formItem.items[0]);
    }

    render() {
        let {formItem,
            chains,
            replaceRequirement,
            cancelReplaceRequirement,
            replaceRequirementAction,
            onFormItemSelected,
            onReceiveChainList,
            confirmChain,
            manageChain} = this.props;
        let popup = null;
        if (replaceRequirement && replaceRequirement.requirements && replaceRequirement.requirements.length > 0) {
            popup = <ReplaceRequirementsPopup 
            replaceRequirement={replaceRequirement}
            cancelReplaceRequirement={cancelReplaceRequirement}
            replaceRequirementAction={replaceRequirementAction}/>
        }

        return <div className='chain-list-manager-container'>
            <FormItem formItem={formItem} onFormItemSelected={onFormItemSelected} />
            <div className='chain-list-container'>
                <ChainList {...this.props}/>
            </div>
            {popup}
        </div>
    }

}

module.exports = ChainListManager;