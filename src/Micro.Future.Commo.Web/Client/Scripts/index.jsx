import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import ReactDOM from 'react-dom';
import ChainList from './Components/Chain/ChainList';
import AddRequirement from './Components/AddRequirement';
import Requirements from './Components/Requirement/Requirements';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, IndexRoute, Link} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import reducers from './reducers';
require('signalr');
import '../Content/site.scss';

const App = ({ children }) =>
    <div>
        <div className='header'>
            <nav className='navbar navbar-default'>
                <div className='container'>
                    <div className="navbar-header">
                        <div className="navbar-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="glyphicon glyphicon-menu-hamburger"></span>
                        </div>
                        <div className="navbar-brand">
                        </div>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse" aria-expanded="false">
                        <div className="close-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="icon-delete"></span></div>
                        <ul className='nav navbar-nav navbar-left'>
                            <li><Link to="/requirement">我的需求</Link></li>
                            <li><Link to="/addRequirement">添加新需求</Link></li>
                        </ul>
                        <div className='clearfix'></div>
                    </div>
                </div>
            </nav>
        </div>
        <div className='container main-wrapper'>
            {children}
        </div>
    </div>;

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
                <Route path="/addRequirement" component={AddRequirement} />
                <Route path="/requirement" component={Requirements}>
                </Route>
                <Route path="/requirement/:requirementId/chains" component={ChainList}/>
                <Route path="*" component={Requirements}/>
            </Route>
        </Router>
    </Provider>,
    $('#app')[0]
);

