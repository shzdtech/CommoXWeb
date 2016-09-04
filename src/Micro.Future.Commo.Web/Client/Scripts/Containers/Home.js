import React from 'react';
import { connect } from 'react-redux';
import Home from '../Components/Home';
import {searchByFilter} from '../Actions';
import {fetchChains} from '../Actions/ChainActions';

const mapStateToProps = (state, ownProps) => {
    return {
        requirements: state.home.requirements,
        isDemo: true,
        selectedFilters: state.filters.filter((f) => {
            return f.selected
        }),
        pageNo: 0,
        pageSize: 20
    };
};

const mapDispatchToProps = (dispatch) => {
   return {
        searchByFilter: (searchCriteria) => {
            dispatch(searchByFilter(searchCriteria));
        },
        fetchChains: (requirementId) => {
            dispatch(fetchChains(requirementId));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);