import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import { authHelper } from '../../_helpers';
import Button from '@material-ui/core/Button';

import AddPlayersDialog from '../AddPlayersDialog';
import VoteDialog from '../Dialogs/voteDialog';
import BalancedTeams from './BalancedTeams';


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
    { game,
        fetchGame,
        groupId,
        goBack,
        deletePlayer,
        addPlayers,
        balanceTeams,
        startVoting,
        sendVotes,
        getVotes,
        votes }) {
    const classes = useStyles();

    const [addPlayersDialogOpened, setaddPlayersDialogOpened] = useState(false);
    const [voteDialogOpened, setVoteDialogOpened] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const action = await fetchGame();
             //TODO remove this when BE send votes with game
            if (action && action.game.voteStatus !== "NOT_STARTED") {
                await getVotes();
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

                    {game.voteStatus === 'NOT_STARTED' && <Grid item>
                        <Button variant="contained" color="primary" onClick={e => startVoting(groupId, game.id)}>
                            Start voting
                    </Button>
                    </Grid>}

                    {game.voteStatus === 'STARTED' && <Grid item>
                        <Button variant="contained" color="secondary" onClick={e => setVoteDialogOpened(true)}>
                            Vote for players
                    </Button>
                    </Grid>}

                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={e => balanceTeams()}>
                            Balance teams
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
                ? <Grid item xs={12} sm={6}>
                    <BalancedTeams balancedTeams={game.balancedTeams.teams} votes={votes} />
                </Grid>
                : <Grid container item xs={12} sm={6} justify="center" alignItems="center">
                    <Grid item >
                        <h6 className="MuiTypography-root MuiTypography-h6">
                            Push button below to balance teams!
                        </h6>
                    </Grid>
                </Grid>}
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

        <VoteDialog
            balancedTeams={game.balancedTeams && game.balancedTeams.teams}
            //balancedTeams={game.players && game.players.filter(player => player.id !== authHelper.getCookie('userId'))}
            gameId={game.id}
            open={voteDialogOpened}
            handleClose={e => setVoteDialogOpened(false)}
            onSubmit={votes => {
                sendVotes(votes)
                setVoteDialogOpened(false);
            }}
        />
    </>
    )
}