import { connect } from 'react-redux';
import {selectChainListType, fetchChainsByType, onReceiveChainList, confirmChain} from '../../Actions';
import ChainListManager from '../../Components/Chain/ChainListManager';

const mapStateToProps = (state, ownProps) => {
    return {
        formItem: state.chainListManager,
        chains: state.chains
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFormItemSelected: (formItem, item) => {
            dispatch(selectChainListType(item));
            dispatch(fetchChainsByType(item.value));
        },
        onReceiveChainList: (chainList) => dispatch(receiveChainList(chainList)),
        confirmChain: (chainId, requirementId, accept) => dispatch(confirmChain(chainId, requirementId, accept))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChainListManager);