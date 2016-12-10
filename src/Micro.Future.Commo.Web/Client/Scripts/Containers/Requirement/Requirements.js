import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Requirements from '../../Components/Requirement/Requirements';
import {fetchRequirements, deleteRequirement, updateExpandState, sortRequirement} from '../../Actions/RequirementActions';
import {fetchChains} from '../../Actions/ChainActions';

const mapStateToProps = (state, ownProps) => {
    return {
        requirements: state.requirements,
        filters: state.myFilters,
        sorters: state.requirement.sorters,
        pageNo: 0,
        pageSize: 100000

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchByFilter: (searchCriteria) => {
            dispatch(fetchRequirements(searchCriteria));
        },
        fetchChains: (requirementId) => {
            dispatch(fetchChains(requirementId));
        },
        deleteRequirement: (requirementId) => {
            dispatch(deleteRequirement(requirementId));
        },
        updateExpandState: (requirementId, state) => {
            dispatch(updateExpandState(requirementId, state));
        },
        sortRequirement: (key) => {
            dispatch(sortRequirement(key));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Requirements);