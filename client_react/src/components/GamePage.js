import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import { authHelper } from '../_helpers';
import Button from '@material-ui/core/Button';
import AddPlayersDialog from './AddPlayersDialog';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    buttonsBar: {
        paddingTop: '22px'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '8px',
        whiteSpac: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

export default function GamePage(
    { gameFromGlobalState, fetchGame, groupId, goBack, deletePlayer, addPlayers, balanceTeams }) {
    let game = gameFromGlobalState;
    const classes = useStyles();

    const [addPlayersDialogOpened, setaddPlayersDialogOpened] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const action = await fetchGame();
            if (action) {
                game = action.game;
            };
        };
        fetch();
    }, []);

    return (<>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <Grid
                    className={classes.buttonsBar}
                    container
                    justify="flex-start"
                    spacing={3}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={e => goBack()}>
                            Back to group
                    </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={e => setaddPlayersDialogOpened(true)}>
                            Add members
                    </Button>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <MaterialTable
                    className={classes.paper}
                    title='Players'
                    data={game.players}
                    columns={[
                        //{ title: 'Num', field: 'id', type: 'numeric' },
                        { title: 'Name', field: 'firstName' },
                        { title: 'Rating', field: 'rating', type: 'numeric' }
                    ]}
                    actions={[
                        player => ({
                            icon: 'delete',
                            tooltip: 'Delete Player',
                            onClick: (event, player) => deletePlayer(player.id),
                            disabled: !authHelper.isGroupAdmin(groupId) || player.id == authHelper.getCookie('userId')
                        })
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        search: false
                    }}
                />

            </Grid>

            {game.balancedTeams
                ? <Grid item xs={12} sm={6}>{generateTeamTables(game.balancedTeams.teams, classes.toolbar)}</Grid>
                : <Grid container item xs={12} sm={6} justify="center" alignItems="center">
                    <Grid item >
                        <h6 className="MuiTypography-root MuiTypography-h6">
                            Push button below to balance teams!
                        </h6>
                    </Grid>
                </Grid>}

            <Grid item xs={12} sm={12}>
                <Button variant="contained" color="secondary" onClick={e => {
                    balanceTeams();
                }}>
                    Balance teams
                </Button>
            </Grid>
        </Grid>

        <AddPlayersDialog
            defaultPlayers={game.players || []}
            groupId={groupId}
            open={addPlayersDialogOpened}
            handleClose={e => setaddPlayersDialogOpened(false)}
            onSubmit={players => {
                addPlayers(players);
                setaddPlayersDialogOpened(false);
            }}
        />
    </>
    )
}

// TODO move into separate file
function generateTeamTables(balancedTeams, toolbarClass) {
    let index = 1;
    return < Grid >
        <Grid container justify="center">
            <Typography variant="h6" >Balanced teams</Typography>
        </Grid>
        {/* Dummy table used to show just column titles */}
        <MaterialTable
            data={[]}
            columns={[
                { title: 'First Name', field: 'firstName' },
                { title: 'Last Name', field: 'lastName' },
                { title: 'Rating', field: 'rating' }
            ]}
            options={{
                search: false,
                paging: false,
                showTitle: false,
                showEmptyDataSourceMessage: false,
                toolbar: false
            }}
        />
        {balancedTeams.map(team =>
            React.cloneElement(<TeamTable />, {
                team,
                index: index++,
                key: index,
                toolbarClass
            }))}
    </Grid>
}

function TeamTable({ team, index, toolbarClass }) {
    return (
        <MaterialTable
            title={`Team ${index}`}
            data={team.players}
            columns={[
                { title: 'First Name', field: 'firstName' },
                { title: 'Last Name', field: 'lastName' },
                { title: 'Rating', field: 'rating' }
            ]}
            options={{
                search: false,
                paging: false,
                header: false
            }}
            components={{
                Toolbar: props => <div className={toolbarClass}>
                    <h6
                        className="MuiTypography-root MuiTypography-h6">
                        {props.title}</h6>
                </div>
            }}
        />)
}