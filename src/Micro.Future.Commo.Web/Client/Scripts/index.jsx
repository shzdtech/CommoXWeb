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
  authSelector: state => state.user, // how to get the user state
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
                <Route path="*" component={Requirements} />
            </Route>
        </Router>
    </Provider>,
    $('#app')[0]
);

