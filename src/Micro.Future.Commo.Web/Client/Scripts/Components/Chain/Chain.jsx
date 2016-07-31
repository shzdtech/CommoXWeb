import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ChainNode from './ChainNode';

class Chain extends React.Component {
    constructor() {
        super();
    }

    render() {
       return <div className='chain'>
            {
                this.props.chain.chainNodes.map((chainNode) => {
                   return <ChainNode key={chainNode.id} chainNode = {chainNode}/>
                })
            }
        </div>;
    }

}

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chain);