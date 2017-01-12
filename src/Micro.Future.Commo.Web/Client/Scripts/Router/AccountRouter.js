import React from 'react';
import { Router, Route} from 'react-router';

import Register from '../Containers/Account/Register';
import CreateUser from '../Containers/Account/CreateUser';
import ManageEnterpriseUsers from '../Containers/Account/ManageEnterpriseUsers';
import ChangePassword from '../Containers/Account/ChangePassword';
import Login from '../Containers/Account/Login';
import UpdateEnterprise from '../Containers/Account/UpdateEnterprise';
import ViewEnterprise from '../Containers/Account/ViewEnterprise';
import EnterpriseAuth from '../Containers/Account/EnterpriseAuth';
import ResetPassword from '../Containers/Account/ResetPassword';

export default <Route>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/createuser" component={CreateUser} />
    <Route path="/manageEnterpriseUsers" component={ManageEnterpriseUsers} />
    <Route path="/changepassword" component={ChangePassword} />
    <Route path="/updateEnterprise" component={UpdateEnterprise} />   
    <Route path="/viewEnterprise" component={ViewEnterprise} />  
    <Route path="/authEnterprise" component={EnterpriseAuth} />   
    <Route path="/resetPassword" component={ResetPassword} />   
</Route>