import React from 'react'; 
import ReactDOM from 'react-dom'; 
import Filter from './Filter';

const FilterList = React.createClass(
{
    render: function() {
        var list = this.props.filters.map(function(filter) {
           return <Filter {...filter} />
        }); 
        return <ul>
        {list}
        </ul>  
    }
});

module.exports = FilterList;