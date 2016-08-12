import React from 'react';
import ReactDOM from 'react-dom';
import FilterList from './FilterList';
import Requirement from './Requirement/Requirement';

class AddRequirement extends React.Component {
    
    render() {
        return <div>
           <FilterList />
           <Requirement />
        </div>;
    }
}

module.exports = AddRequirement;