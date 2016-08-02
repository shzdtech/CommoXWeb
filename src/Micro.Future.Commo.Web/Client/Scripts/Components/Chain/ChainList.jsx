import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Chain from './Chain';
import {} from '../../Actions';

class ChainList extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            {
                this.props.chains.map((chain) => {
                    return <Chain key={chain.id} chain={chain} />
                })
            }
        </div>
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        chains: state.chains
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChainList);