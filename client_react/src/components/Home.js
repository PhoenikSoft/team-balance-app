import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import TopBar from './TopBarComponent';
import Profile from './ProfileContainer';
import SnackBar from './Snackbar';


export default function HomeView() {
    let { path } = useRouteMatch();

    return (<React.Fragment>
        <TopBar />
        <Switch>
            <Route exact path={path}>
                <div> Groups</div>
            </Route>
            <Route exact path={`${path}/profile`}>
                <Profile/>
            </Route>
            <Route exact path={`${path}/groups/:groupId`}>
                <div> Some group</div>
            </Route>
            <Route exact path={`${path}/groups/:groupId/games/:gameId`}>
                <div> Some game</div>
            </Route>
        </Switch>
        <SnackBar />

    </React.Fragment>)
}