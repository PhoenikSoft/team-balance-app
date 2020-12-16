import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history, authHelper } from '../_helpers';
import SignIn from './SignInComponent';
import SignUp from './SignUpContainer';
import Home from './Home';
import Loader from './Spinner';
import AddMe from './AddMe';
import ForgotPassword from './ForgotPasswordComponent';
import ResetPassword from './ResetPasswordComponent';

const App = () => (
    <div>
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route path='/login'>
                    <SignIn />
                </Route>
                <Route path='/register'>
                    <SignUp />
                </Route>
                <Route path='/forgot-password'>
                    <ForgotPassword />
                </Route>
                <Route path='/reset-password'>
                    <ResetPassword />
                </Route>
                <Route path='/home' render={()=>(
                    authHelper.isAuthenticated()
                    ? <Home />
                    : <Redirect to="/login" />
                )}/>
                <Route exact path='/addMe/:ref'>
                    <AddMe />
                </Route>
                <Redirect from="*" to="/" />
            </Switch>
            <Loader />
        </Router>
    </div >
);

export default App;
