import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import TopBar from './TopBarComponent';
import Profile from './ProfileContainer';
import SnackBar from './Snackbar';
import GroupsList from './GroupsListContainer';
import GroupPage from './GroupPageContainer';
import GamePage from './GamePageContainer';


export default function HomeView() {
    let { path } = useRouteMatch();

    return (<React.Fragment>
        <TopBar />
        <Switch>
            <Route exact path={path}>
                <GroupsList />
            </Route>
            <Route exact path={`${path}/profile`}>
                <Profile />
            </Route>
            <Route exact path={`${path}/groups/:groupId`}>
                <GroupPage />
            </Route>
            <Route exact path={`${path}/groups/:groupId/games/:gameId`}>
                <GamePage />
            </Route>

        </Switch>
        <SnackBar />

    </React.Fragment>)
}