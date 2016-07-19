import React, {PropTypes} from 'react'; 
import ReactDOM from 'react-dom'; 
import Filter from './Filter';

class FilterList extends React.Component{
    render() {
        var list = this.props.filters.map(function(filter) {
           return <Filter {...filter} />
        }); 
        return <div>
        <span>所有〉</span>
        <ul>
        {list}
        </ul>
        </div>
    }
}

module.exports = FilterList;