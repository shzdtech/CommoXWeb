import React from 'react'; 
import ReactDOM from 'react-dom'; 
import Filter from './Components/Filter';
import filters from 'filterList';
import '../Content/site.scss';

const App = React.createClass(
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

ReactDOM.render(
    <App filters={filters} />,
    document.getElementById('filter_container')
);

