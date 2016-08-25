import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Containers/Header';
import ChainList from './Containers/Chain/ChainList';
import ChainListManger from './Containers/Chain/ChainListManager';
import AddRequirement from './Components/AddRequirement';
import Requirements from './Components/Requirement/Requirements';
import Register from './Containers/Account/Register';
import Login from './Containers/Account/Login';
import Form from './Components/Form/Form';
import FormConfirmation from './Components/Form/FormConfirmation';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, IndexRoute, Link} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
require('signalr');
import '../Content/site.scss';

class App extends React.Component{
    render(){
        console.log(this.props);
        return <div>
        <Header />
        <div className='container main-wrapper'>
            {this.props.children}
        </div>
        </div>
    }
}

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
);

const rm = routerMiddleware(browserHistory);

let store = createStore(reducers,
    applyMiddleware(thunk, rm));

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store = {store}>
        <Router history={history}>
            <Route path='/' component={App} >
                <IndexRoute component={Requirements} />
                <Route path="/addRequirement" component={Form} />
                <Route path="/requirement" component={Requirements}>
                </Route>
                <Route path="/formConfirm" component={FormConfirmation}>
                </Route>
                <Route path="/requirement/:requirementId/chains" component={ChainList}/>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/chainManager" component={ChainListManger} />
                <Route path="*" component={Requirements}/>
            </Route>
        </Router>
    </Provider>,
    $('#app')[0]
);

