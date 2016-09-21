import { connect } from 'react-redux';
import ChainList from '../../Components/Chain/ChainList';

const mapStateToProps = (state, ownProps) => {
    return {
        chains: state.chain.chains
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChainList);