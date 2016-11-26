import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import objectAssignPolyfill from './Util/objectAssignPolyfill';
import arrayFindPolyfill from './Util/arrayFindPolyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Containers/Home';
import MarketQuotation from './Containers/MarketQuotation';
import Header from './Containers/Header';
import Footer from './Components/Common/Footer';
import ChainList from './Containers/Chain/ChainList';
import ChainListManger from './Containers/Chain/ChainListManager';
import CreateChain from './Containers/Chain/CreateChain';
import AcceptanceManager from './Containers/Admin/AcceptanceManager';
import AcceptanceBankManager from './Containers/Admin/AcceptanceBankManager';
import FinanceManager from './Containers/Admin/FinanceManager';
import AddRequirement from './Components/AddRequirement';
import Requirements from './Containers/Requirement/Requirements';
import Form from './Containers/Form/Form';
import FormConfirmation from './Containers/Form/FormConfirmation';
import AccountRouter from './Router/AccountRouter';

import BillTrade from './Containers/Trade/BillTrade';
import FundTrade from './Containers/Trade/FundTrade';

import ManageTrade from './Containers/Order/ManageTrade';

import {showToastr} from './Actions/CommonActions';

import auth from './auth';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, IndexRoute, Link} from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper'
import thunk from 'redux-thunk';
import reducers from './reducers';
require('signalr');
import '../Content/site.scss';

$.ajaxSetup({ cache: false });

objectAssignPolyfill();
arrayFindPolyfill();

class App extends React.Component {
    render() {
        //console.log(this.props);
        //console.log(this.props.location.query);
        let className = this.props.location.pathname === '/' || this.props.location.pathname === '/marketQuotation' ? 'home' : 'container main-wrapper';
        if (this.props.location.pathname === '/billTrade' || this.props.location.pathname === '/fundTrade') {
            className = 'trade';
        }
        return <div>
            <Header />
            <div className={className}>
                {this.props.children}
            </div>
            <Footer />
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

const rm = routerMiddleware(browserHistory);

let store = createStore(reducers,
    applyMiddleware(thunk, rm));

const history = syncHistoryWithStore(browserHistory, store)

const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.account.login, // how to get the user state
    redirectAction: routerActions.replace, // the redux action to dispatch for redirect
    wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

const UserIsAdmin = UserAuthWrapper({
    authSelector: state => state.account.login,
    failureRedirectPath: '/',
    predicate: user => user && user.isAdmin,
    redirectAction: (newLoc) => (dispatch) => {
        browserHistory.replace(newLoc);
        dispatch(showToastr({
            message: '您没有此操作的权限',
            toastType: 'toast-warning',
            show: true,
            autoClose: true
        }));
    }
});

ReactDOM.render(
    <Provider store = {store}>
        <Router history={history}>
            <Route path='/' component={App} >
                <IndexRoute component={Home} />
                <Route path="/marketQuotation" component={MarketQuotation} />
                <Route path="/addRequirement" component={UserIsAuthenticated(Form) } />
                <Route path="/requirement" component={UserIsAuthenticated(Requirements) }>
                </Route>
                <Route path="/formConfirm" component={FormConfirmation}>
                </Route>
                <Route path="/requirement/:requirementId/chains" component={ChainList}/>
                {AccountRouter}
                <Route path="/manageTrade" component={UserIsAuthenticated(ManageTrade)} />
                <Route path="/chainManager" component={UserIsAuthenticated(UserIsAdmin(ChainListManger))} />
                <Route path="/createChain" component={UserIsAuthenticated(UserIsAdmin(CreateChain))} />
                <Route path="/acceptanceManage" component={UserIsAuthenticated(UserIsAdmin(AcceptanceManager))} />
                <Route path="/acceptanceBankManage" component={UserIsAuthenticated(UserIsAdmin(AcceptanceBankManager))} />
                <Route path="/financeManage" component={UserIsAuthenticated(UserIsAdmin(FinanceManager))} />
                <Route path='/billTrade' component={BillTrade} />
                <Route path='/fundTrade' component={FundTrade} />
                <Route path="*" component={Home} />
            </Route>
        </Router>
    </Provider>,
    $('#app')[0]
);

