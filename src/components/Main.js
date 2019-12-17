import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Engineer from '../components/engineers/Engineer'
import EngineerCreate from '../components/engineers/EngineerCreate'
import EngineerEdit from '../components/engineers/EngineerEdit'
import EngineerSingle from '../components/engineers/EngineerSingle'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

function Main () {
  return (
    <Switch>
      <Route exact path='/' component={Engineer} />
      <Route exact path='/engineer/create' component={EngineerCreate} />
      <Route exact path='/engineer/:id' component={EngineerSingle} />
      <Route exact path='/engineer/:id/edit' component={EngineerEdit} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Switch>
  )
}

export default Main
