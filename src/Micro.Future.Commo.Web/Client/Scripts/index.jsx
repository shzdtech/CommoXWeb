import React from 'react'; 
import ReactDOM from 'react-dom'; 
import FilterList from './Components/FilterList';
import ChainList from './Components/Chain/ChainList';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers';
import '../Content/site.scss';

const App = React.createClass(
{
    render: function() {
        return <div>
        <FilterList  />
        <ChainList />
        </div>;
    }
});

let store = createStore(reducers);

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

