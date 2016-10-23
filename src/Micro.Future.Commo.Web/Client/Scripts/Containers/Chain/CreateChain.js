import { connect } from 'react-redux';
import CreateChain from '../../Components/Chain/CreateChain';
import { push } from 'react-router-redux';
import {createChainWithNewRequirement,
    createChainWithSelect,
    createChainWithRandomOne,
    createChainWithRandomMore,
    removeChainNodeFromTempChain,
    cancelSelectRequirement,
    selectRequirementAction,       
    selectCreateChainOption,
    typeCreateChainOption,
    resetCreateChainOption,
    submitCreateChain
} from '../../Actions/ChainActions';

const mapStateToProps = (state, ownProps) => {
    return {
        createChainState: state.chain.createChainState,
        selectRequirement: state.chain.selectRequirement,
        filters: state.selectRequirementFilters,
        createChainOptions: state.chain.createChainOptions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createRequirement: () => {
            dispatch(createChainWithNewRequirement());
            dispatch(push("/addRequirement"))
        },
        createChainWithSelectAction: (searchCriteria) => dispatch(createChainWithSelect(searchCriteria)),
        randomOne: () => dispatch(createChainWithRandomOne()),
        randomMore: () => dispatch(createChainWithRandomMore()),
        removeChainNode: (index) => dispatch(removeChainNodeFromTempChain(index)),
        cancelSelectRequirement: () => dispatch(cancelSelectRequirement()),
        selectRequirementAction: (chainId, index, requirement) =>{
            dispatch(selectRequirementAction(chainId, index, requirement));
            dispatch(cancelSelectRequirement());
        },
        onCreateChainOptionTyped: (formItem, value)=>dispatch(typeCreateChainOption(formItem, value)), 
        onCreateChainOptionSelected: (formItem, item) => dispatch(selectCreateChainOption(formItem, item)),
        submitCreateChain: (createChainState, createChainOptions) => dispatch(submitCreateChain(createChainState, createChainOptions))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChain);