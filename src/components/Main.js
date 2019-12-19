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


// let base64Url = localStorage.getItem('token').split('.')[1]
// let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
// let payload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//     }).join('')
// )
//
// let user = JSON.parse(payload)

// if(localStorage.getItem('token') === null) {
//     localStorage.setItem('token', 'Unauthorized')
// } else {
    // localStorage.removeItem('token')
    // setTimeout(function() {

    // }, 4000)
// }
//
//
//

// console.log(user)





class Main extends React.Component {



    render() {

        return (
            <Switch>
                <Route exact path='/' component={app} />

                <Route exact path='/engineer' component={Engineer} />
                <Route exact path='/engineer/create' component={EngineerCreate} />
                <Route exact path='/engineer/:id' component={EngineerSingle} />
                <Route exact path='/engineer/:id/edit' component={EngineerEdit} />

                <Route path='/company' component={Company} />
                <Route path='/company/create' component={CompanyCreate} />
                <Route path='/company/:id' component={CompanySingle} />
                <Route path='/company/:id/edit' component={CompanyEdit} />

                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />

                <Route component={NotFound} />
            </Switch>
        )
    }


}

export default Main
