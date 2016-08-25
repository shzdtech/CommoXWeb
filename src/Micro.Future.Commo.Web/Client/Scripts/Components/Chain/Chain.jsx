import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ChainNode from './ChainNode';

class Chain extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {chain, confirmChain, manageChain} = this.props;
        let operators = null;
        let operatorsOverlay = null;
        if (manageChain) {
            operators = <div className='operators'>
                <span className='btn' onClick={() => manageChain(chain.chainId, true) }>确认</span>
                <span className='btn' onClick={() => manageChain(chain.chainId, false) }>拒绝</span>
            </div>
            operatorsOverlay = <div className='operators-overlay'></div>
        }

        return <div className={chain.reject ? 'chain reject' : 'chain'}>
            {
                this.props.chain.requirements.map((requirement) => {
                    return <ChainNode key={requirement.requirementId}
                        chainId={chain.chainId}
                        chain={chain}
                        requirement={requirement}
                        confirmChain={confirmChain} />;
                })
            }
            {operators}
            {operatorsOverlay}
        </div>;
    }

}

module.exports = Chain;