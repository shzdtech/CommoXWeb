import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {} from '../../Actions';

class ChainNode extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {chainNode} = this.props;
        return (<div className='chain-node'>
            <div className='title'>{chainNode.name}</div>
            <div className='sub-title'>{chainNode.product}</div>
            <div className='operators'>
                <span className='btn'>确认</span>
                <span className='btn'>拒绝</span>
            </div>
            <div className='operators-overlay'></div>
        </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(ChainNode);