import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Requirements from '../../Components/Requirement/Requirements';
import {fetchRequirements} from '../../Actions/RequirementActions';
import {fetchChains} from '../../Actions/ChainActions';

const mapStateToProps = (state, ownProps) => {
    return {
        requirements: state.requirements,
        filters: state.myFilters,
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
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Requirements);