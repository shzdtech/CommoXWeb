import React from 'react';
import ReactDOM from 'react-dom';
import FilterList from './Components/FilterList';
import ChainList from './Components/Chain/ChainList';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers';
require('signalr');
import '../Content/site.scss';

const App = React.createClass(
    {
        render: function () {
            var connection = $.hubConnection('http://localhost:5000/signalr', { useDefaultPath: false });
            var chainhub = connection.createHubProxy('chainHub');

            connection.logging = true;
            console.log("connection.hub.start");
            connection.start().done(function () {
                console.log("start done");
                chainhub.invoke('callOnChainChanged');
            }).fail(function (error) { console.log('Could not Connect!'); });
            chainhub.on('onRequirementChainChanged', (requimentInfoList) => {

                console.log(requimentInfoList);
            })


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
    $('#app')[0]
);

