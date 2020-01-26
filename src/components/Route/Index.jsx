import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import NotFound from '../layouts/NotFound';
import Engineer from '../Engineer/Index';
import EngineerProfile from '../Engineer/EngineerProfile/Index';
import EngineerProfileShow from '../Engineer/EngineerProfile/ProfileShow/Index';
import EngineerProfileEdit from '../Engineer/EngineerProfile/ProfileEdit/Index';
import Company from '../Company/Index';
import CompanyProfile from '../Company/CompanyProfile/Index';
import CompanyProfileShow from '../Company/CompanyProfile/ProfileShow/Index';
import CompanyProfileEdit from '../Company/CompanyProfile/ProfileEdit/Index';
import Private from './Private/Index';
const Routes = () => {
    return (
        <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/companies' component={Company} />
            <Private exact path='/company/profile' component={CompanyProfile} />
            <Route exact path='/company/profile/:slug' component={CompanyProfileShow} />
            <Private exact path='/company/profile/me/edit' component={CompanyProfileEdit} />
            <Route exact path='/engineers' component={Engineer} />
            <Private exact path='/engineer/profile' component={EngineerProfile} />
            <Route exact path='/engineer/profile/:slug' component={EngineerProfileShow} />
            <Private exact path='/engineer/profile/me/edit' component={EngineerProfileEdit} />
            <Route component={NotFound} />
        </Switch>
    )
}
export default Routes
