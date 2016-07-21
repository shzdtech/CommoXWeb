import React from 'react'; 
import ReactDOM from 'react-dom'; 
import FilterList from './Components/FilterList';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import filterReducers from './Reducers';
import '../Content/site.scss';

const App = React.createClass(
{
    render: function() {
        return <FilterList  />;
    }
});

let store = createStore(filterReducers);

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('filter_container')
);

