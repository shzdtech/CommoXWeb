import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import objectAssignPolyfill from './Util/objectAssignPolyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Containers/Home';
import Header from './Containers/Header';
import ChainList from './Containers/Chain/ChainList';
import ChainListManger from './Containers/Chain/ChainListManager';
import AcceptanceManager from './Containers/Admin/AcceptanceManager';
import FinanceManager from './Containers/Admin/FinanceManager';
import AddRequirement from './Components/AddRequirement';
import Requirements from './Containers/Requirement/Requirements';
import Form from './Containers/Form/Form';
import FormConfirmation from './Containers/Form/FormConfirmation';
import AccountRouter from './Router/AccountRouter';
import auth from './auth';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, IndexRoute, Link} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper'
import thunk from 'redux-thunk';
import reducers from './reducers';
require('signalr');
import '../Content/site.scss';

$.ajaxSetup({cache:false});

objectAssignPolyfill();

class App extends React.Component{
    render(){
        console.log(this.props);
        let className = this.props.location.pathname === '/' ? 'home' : 'container main-wrapper';
        return <div>
        <Header />
        <div className={className}>
            {this.props.children}
        </div>
        </div>
    }
}

// const requireAuth = (nextState, replace) => {
//     console.log(nextState.location.pathname);
//   if (!auth.loggedIn()) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.account.login, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

const rm = routerMiddleware(browserHistory);

let store = createStore(reducers,
    applyMiddleware(thunk, rm));

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store = {store}>
        <Router history={history}>
            <Route path='/' component={App} >
                <IndexRoute component={Home} />
                <Route path="/addRequirement" component={Form} />
                <Route path="/requirement" component={UserIsAuthenticated(Requirements)}>
                </Route>
                <Route path="/formConfirm" component={FormConfirmation}>
                </Route>
                <Route path="/requirement/:requirementId/chains" component={ChainList}/>           
                {AccountRouter}
                <Route path="/chainManager" component={ChainListManger} />
                <Route path="/acceptanceManage" component={AcceptanceManager} />
                <Route path="/financeManage" component={FinanceManager} />
                <Route path="*" component={Requirements} />
            </Route>
        </Router>
    </Provider>,
    $('#app')[0]
);

