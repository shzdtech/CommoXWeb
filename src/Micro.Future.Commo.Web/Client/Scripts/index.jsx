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
import thunk from 'redux-thunk';
import reducers from './reducers';
require('signalr');
import '../Content/site.scss';

const App = ({ children }) =>
    <div>
        <div className='header'>
            <nav className='navbar navbar-default'>
                <div id="navbar container" class="navbar-collapse collapse" aria-expanded="false">
                    <div class="close-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="icon-delete"></span></div>
                    <ul className='nav navbar-nav navbar-left'>
                        <li><Link to="/requirement">我的需求</Link></li>
                        <li><Link to="/addRequirement">添加新需求</Link></li>
                    </ul>
                    <div className='clearfix'></div>
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


let store = createStore(reducers,
    DevTools.instrument(),
    applyMiddleware(thunk));

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store = {store}>
        <Router history={history}>
            <Route path='/' component={App} >
                <IndexRoute component={Requirements} />
                <Route path="/addRequirement" component={AddRequirement} />
                <Route path="/requirement" component={Requirements}>
                </Route>
                 <Route path="/chains" component={ChainList}/>
                <Route path="*" component={Requirements}/>
            </Route>
        </Router>
    </Provider>,
    $('#app')[0]
);

