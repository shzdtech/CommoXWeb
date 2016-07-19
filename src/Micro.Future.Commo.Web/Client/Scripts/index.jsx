import React from 'react'; 
import ReactDOM from 'react-dom'; 
import FilterList from './Components/FilterList';
import filters from 'filterList';
import '../Content/site.scss';

const App = React.createClass(
{
    render: function() {
        return <FilterList filters={filters} />;
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('filter_container')
);

