import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layouts/Alert';
import NotFound from '../layouts/NotFound';
import Engineer from '../layouts/Engineer'
import EngineerSingle from '../layouts/EngineerSingle'
import EngineerAdd from '../layouts/EngineerForm'

const Routes = () => {
    return (
        <div className='container'>
            <Switch>

                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />

                <Route exact path='/engineers' component={Engineer} />
                <Route exact path='/engineer' component={EngineerSingle} />
                <Route exact path='/engineer/add' component={EngineerAdd} />

                <Route component={NotFound} />

            </Switch>
        </div>
    );
};

export default Routes;
