import React from 'react';
import { Router, Route} from 'react-router';

import Register from '../Containers/Account/Register';
import CreateUser from '../Containers/Account/CreateUser';
import ChangePassword from '../Containers/Account/ChangePassword';
import Login from '../Containers/Account/Login';
import UpdateEnterprise from '../Containers/Account/UpdateEnterprise';
import EnterpriseAuth from '../Containers/Account/EnterpriseAuth';

export default <Route>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/createuser" component={CreateUser} />
    <Route path="/changepassword" component={ChangePassword} />
    <Route path="/updateEnterprise" component={UpdateEnterprise} />   
    <Route path="/authEnterprise" component={EnterpriseAuth} />   
</Route>