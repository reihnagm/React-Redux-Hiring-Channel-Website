import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Register from '../Auth/Register'
import Login from '../Auth/Login'
import NotFound from '../layouts/NotFound'
import Engineer from '../Engineer/Index'
import Profile from '../Engineer/EngineerProfile/Index'
import ProfileEdit from '../Engineer/EngineerProfile/ProfileEdit/Index'
import Private from './Private/Index'
const Routes = () => {
    return (
        <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/engineers' component={Engineer} />
            <Private exact path='/engineer/profile' component={Profile} />
            <Private exact path='/engineer/profile/edit' component={ProfileEdit} />
            <Route component={NotFound} />
        </Switch>
    )
}
export default Routes
