import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Requirements from '../../Components/Requirement/Requirements';
import {fetchRequirements, fetchChains} from '../../Actions';

const mapStateToProps = (state, ownProps) => {
    return {
        requirements: state.requirements
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRequirements: () => {
            dispatch(fetchRequirements());
        },
        fetchChains: (requirementId) => {
            dispatch(fetchChains(requirementId));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Requirements);