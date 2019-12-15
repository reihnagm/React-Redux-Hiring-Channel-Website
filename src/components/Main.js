import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Engineer from '../components/engineers/Engineer'
import EngineerCreate from '../components/engineers/EngineerCreate'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

function Main () {
  return (
    <Switch>
      <Route exact path='/' component={Engineer} />
      <Route path='/engineer/create' component={EngineerCreate} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </Switch>
  )
}

export default Main
