import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ChainNode from './ChainNode';

class Chain extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {chain, confirmChain} = this.props;
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
        </div>;
    }

}

module.exports = Chain;