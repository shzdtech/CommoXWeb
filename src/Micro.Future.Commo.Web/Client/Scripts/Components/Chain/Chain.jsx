import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ChainNode from './ChainNode';

class Chain extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {chain, confirmChain, manageChain, unlockChain, getRequirementReplacement} = this.props;

        let className = 'chain';
        let text = '锁定';
         if (chain.chainStatus === 0) {
             className += ' open';
        }
        if (chain.chainStatus === 1) {
            className += ' locked';
            text = '确认';
        } else if (chain.chainStatus === 2) {
            className += ' confirmed'
        }

        if (chain.reject) {
            className + 'reject';
        }

        let operators = null;
        let operatorsOverlay = null;
        if (manageChain && (chain.chainStatus === 0 || chain.chainStatus === 1)) {
            operators = <div className='operators'>
                <span className='btn btn-large' onClick={() => manageChain(chain) }>{text}</span>
                {chain.chainStatus === 1 ? <span className='btn btn-large' onClick={() => unlockChain(chain) }>解除锁定</span> : null}
            </div>
          //  operatorsOverlay = <div className='operators-overlay'></div>
        }

        return <div className={className}>
            {operators}
            {operatorsOverlay}
            {
                this.props.chain.requirements.map((requirement, index) => {
                    return <ChainNode key={requirement.requirementId}
                        chainId={chain.chainId}
                        chain={chain}
                        requirement={requirement}
                        confirmChain={confirmChain}
                        getRequirementReplacement={getRequirementReplacement}
                        index={index} />;
                })
            }
        </div>;
    }

}

module.exports = Chain;