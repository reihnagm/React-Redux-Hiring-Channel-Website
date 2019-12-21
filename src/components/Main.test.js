import React from 'react'
import { Switch, Route } from 'react-router-dom'
import app from './app/Index'

import Engineer from './engineers/Engineer'
import EngineerCreate from './engineers/EngineerCreate'
import EngineerEdit from './engineers/EngineerEdit'
import EngineerSingle from './engineers/EngineerSingle'

import Company from './companies/Company'
import CompanyCreate from './companies/CompanyCreate'
import CompanyEdit from './companies/CompanyEdit'
import CompanySingle from './companies/CompanySingle'

import Login from './auth/Login'
import Register from './auth/Register'

const NotFound = () => { return (<h1>404, Not Found</h1>) }

class Main extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={app} />

        <Route exact path='/engineer' component={Engineer} />
        <Route exact path='/engineer/create' component={EngineerCreate} />
        <Route exact path='/engineer/:id' component={EngineerSingle} />
        <Route exact path='/engineer/:id/edit' component={EngineerEdit} />

        <Route exact path='/company' component={Company} />
        <Route exact path='/company/create' component={CompanyCreate} />
        <Route exact path='/company/:id' component={CompanySingle} />
        <Route exact path='/company/:id/edit' component={CompanyEdit} />

        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default Main
