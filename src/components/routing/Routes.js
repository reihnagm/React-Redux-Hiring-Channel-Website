import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Register from '../auth/Register'
import Login from '../auth/Login'
import NotFound from '../layouts/NotFound'
import Company from '../layouts/Company'
import CompanyAdd from '../layouts/CompanyAdd'
import CompanySingle from '../layouts/CompanySingle'
import CompanyEdit from '../layouts/CompanyEdit'
import Engineer from '../layouts/Engineer'
import Profile from '../layouts/Profile'
import UpdateProfileEngineer from '../layouts/UpdateProfileEngineer'
import EngineerSingle from '../layouts/EngineerSingle'
import EngineerEdit from '../layouts/EngineerEdit'

const Routes = () => {
    return (
            <Switch>

                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />

                <Route exact path='/companies' component={Company} />
                <Route exact path='/company/add' component={CompanyAdd} />
                <Route exact path='/company/edit/:id' component={CompanyEdit} />
                <Route exact path='/company/show/:id' component={CompanySingle} />

                <Route exact path='/engineers' component={Engineer} />
                <Route exact path='/engineer/profile' component={Profile} />
                <Route exact path='/engineer/update-profile/:id/edit' component={UpdateProfileEngineer} />
                <Route exact path='/engineer/edit/:id' component={EngineerEdit} />
                <Route exact path='/engineer/show/:id' component={EngineerSingle} />

                <Route component={NotFound} />

            </Switch>
    )
}

export default Routes
