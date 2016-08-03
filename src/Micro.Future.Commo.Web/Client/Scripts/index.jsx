import React from 'react';
import ReactDOM from 'react-dom';
import FilterList from './Components/FilterList';
import ChainList from './Components/Chain/ChainList';
import Requirement from './Components/Requirement/Requirement';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers';
require('signalr');
import '../Content/site.scss';

const App = React.createClass(
    {
        render: function (){
            return <div>
                <FilterList  />
                <Requirement />
                <ChainList />
            </div>;
        }
    });

let store = createStore(reducers);

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    $('#app')[0]
);

