import React, { Fragment, useEffect } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Landing from './layouts/Landing'
import Routes from './routing/Routes'

import { Provider } from 'react-redux'
import { loadUser } from '../actions/auth'
import store from '../store'
import setAuthToken from '../utils/setAuthToken'

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

let dotenv = require('dotenv')
let dotenvExpand = require('dotenv-expand')

dotenvExpand(dotenv.config())

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path='/' component={Landing} />
                        <Route component={Routes} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    )

}

export default App
