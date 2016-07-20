import React, {PropTypes} from 'react'; 
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'; 
import Filter from './Filter';

class FilterList extends React.Component{
    render() {
        var list = this.props.filters.map(function(filter) {
           return <Filter {...filter} />
        }); 

        var selected = this.props.selectedFilters.map((selectedFilter) => {
            var names = selectedFilter.items.map((item)=>{
                return item.name;
            });
            return <span>{selectedFilter.title + ': ' + names.join(', ')}</span>
        });

        return <div>
        <span>所有〉</span>{selected}
        <ul>
        {list}
        </ul>
        </div>
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    selectedFilters: [...state.filters]
  }
}

module.exports = connect(mapStateToProps, {})(FilterList);