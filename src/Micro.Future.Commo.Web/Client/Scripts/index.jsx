import React from 'react'; 
import ReactDOM from 'react-dom'; 
import FilterList from './Components/FilterList';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import filterStatus from './Reducers/filterStatus';
import filters from 'filterList';
import '../Content/site.scss';

const App = React.createClass(
{
    render: function() {
        return <FilterList filters={filters} />;
    }
});

let store = createStore(filterStatus);

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('filter_container')
);

