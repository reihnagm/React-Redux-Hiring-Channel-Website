import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import App from './components/App/Index';
import store, { history } from './store';
const AppWithRouter = withRouter(App);
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppWithRouter />
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
