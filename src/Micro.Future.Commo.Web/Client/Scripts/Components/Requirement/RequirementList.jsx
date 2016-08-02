import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Filter from '../Filter';
import InputFilter from '../InputFilter';
import {TEXT} from '../../Constants/FilterTypes';

class RequirementList extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <div className='requirements'>
        {
            this.props.requirements.map((requirement) =>{
                if(requirement.type === TEXT){
                    return <InputFilter key={requirement.id} filter = {requirement} />;
                }
                return <Filter key={requirement.id} filter = {requirement} />;
            })
        }
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        requirements: [...state.requirements]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(RequirementList);