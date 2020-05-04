import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../_helpers';
import SignIn from './SignInComponent';
import SignUp from './SignUpComponent';

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
                    <div>HOME</div>
                </Route>

                <Redirect from="*" to="/" />

            </Switch>
        </Router>
    </div >
);

export default App;
