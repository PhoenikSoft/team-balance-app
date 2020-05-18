import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import { authHelper } from '../_helpers';
import Button from '@material-ui/core/Button';
import AddPlayersDialog from './AddPlayersDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

export default function GamePage(
    { gameFromGlobalState, fetchGame, groupId, goBack, deletePlayer, addPlayers }) {
    let game = gameFromGlobalState;
    const classes = useStyles();
    //let 
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

    return (
        <div>
            <div>
                <div className={classes.spacing}>
                    <Button variant="contained" color="primary" onClick={e => goBack()}>
                        Back to group
                    </Button>
                    <Button variant="contained" color="primary" onClick={e => setaddPlayersDialogOpened(true)}>
                        Add members
                    </Button>
                </div>
            </div>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <MaterialTable
                        className={classes.paper}
                        title='Playes'
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
                {/* <Grid item xs={12} sm={6}>
                    <MaterialTable
                        className={classes.paper}
                        onRowClick={onGameRowClick}
                        title='Games'
                        data={group.games}
                        columns={[
                            //{ title: 'Num', field: 'id', type: 'numeric' },
                            { title: 'Name', field: 'name' },
                            { title: 'Start date', field: 'startDateTime' }
                            //players number

                        ]}
                        actions={[
                            rowData => ({
                                icon: 'delete',
                                tooltip: 'Delete Game',
                                onClick: (event, rowData) => deleteGame(rowData.id, group.id),
                                disabled: !authHelper.isGroupAdmin(group.id)
                            })
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            search: false
                        }}
                    />
                </Grid>*/}
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
        </div>
    )
}