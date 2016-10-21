import { connect } from 'react-redux';
import CreateChain from '../../Components/Chain/CreateChain';
import { push } from 'react-router-redux';
import {createChainWithNewRequirement,
    createChainWithSelect,
    createChainWithRandomOne,
    createChainWithRandomMore,
    removeChainNodeFromTempChain
} from '../../Actions/ChainActions';

const mapStateToProps = (state, ownProps) => {
    return {
        createChainState: state.chain.createChainState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createRequirement: () => {
            dispatch(createChainWithNewRequirement());
            dispatch(push("/addRequirement"))
        },
        selectRequirement: () => dispatch(createChainWithSelect()),
        randomOne: () => dispatch(createChainWithRandomOne()),
        randomMore: () => dispatch(createChainWithRandomMore()),
        removeChainNode: (index) => dispatch(removeChainNodeFromTempChain(index))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChain);