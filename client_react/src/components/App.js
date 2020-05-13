import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../_helpers';
import SignIn from './SignInComponent';
import SignUp from './SignUpContainer';
import Home from './Home';
import Loader from './Spinner';

const App = () => (
    <div>
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
                <Route path='/login'>
                    <SignIn />
                </Route>
                <Route path='/register'>
                    <SignUp />
                </Route>
                <Route path='/home'>
                    <Home />
                </Route>
                <Redirect from="*" to="/" />
            </Switch>
            <Loader />
        </Router>
    </div >
);

export default App;
