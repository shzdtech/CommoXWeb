import { connect } from 'react-redux';
import ChainList from '../../Components/Chain/ChainList';

const mapStateToProps = (state, ownProps) => {
    return {
        chains: state.chains
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReceiveChainList: (chainList) => dispatch(receiveChainList(chainList)),
        confirmChain: (chainId, requirementId, accept) => dispatch(confirmChain(chainId, requirementId, accept)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChainList);