import React from 'react';
import Requirement from '../Common/Requirement';

class ReplaceRequirement extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {replaceRequirementAction, index, chainId, requirement} = this.props;
        let operators = <a className='btn' 
        onClick={()=> replaceRequirementAction(chainId, index, requirement)}>{this.props.actionName}</a>
        return <Requirement requirement={this.props.requirement}>{operators}</Requirement>
    }
}

module.exports = ReplaceRequirement;