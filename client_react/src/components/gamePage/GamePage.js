import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

import { authHelper } from '../../_helpers';
import AddPlayersDialog from '../AddPlayersDialog';
import VoteDialog from '../Dialogs/voteDialog';
import TeamCountDialog from '../Dialogs/teamCountDialog';
import BalancedTeams from './BalancedTeams';
import CountDownTimer from './CountdownTimer';

const voteStatus = {
    NOT_STARTED: 'NOT_STARTED',
    STARTED: 'STARTED',
    FINISHED: 'FINISHED',
};

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
        justifyContent: 'flex-end',
        paddingTop: '8px',
        whiteSpac: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

export default withTranslation() (function GamePage(
    {   t,
        game,
        fetchGame,
        groupId,
        goBack,
        deletePlayer,
        addPlayers,
        balanceTeams,
        startVoting,
        sendVotes,
        getVotes,
        votes,
        votingFinished }) {
    const classes = useStyles();

    const [addPlayersDialogOpened, setaddPlayersDialogOpened] = useState(false);
    const [voteDialogOpened, setVoteDialogOpened] = useState(false);
    const [teamCountDialogOpened, setTeamCountDialogOpened] = useState(false);
    const isGameContainsPlayers = game.players && !!game.players.length;
    const isTeamsBalanced = game.balancedTeams && !!game.balancedTeams.teams;

    useEffect(() => {
        const fetch = async () => {
            await Promise.all([fetchGame(), getVotes()]);
        };
        fetch();
    }, []);

    return (<>
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid
                    className={classes.buttonsBar}
                    container
                    justify="flex-start"
                    spacing={1}>
                    <Grid item xs={12} >
                        <Typography variant="h5" gutterBottom>
                            {game.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={e => goBack()}>
                            Back to group
                    </Button>
                    </Grid>
                    {game.voteStatus === voteStatus.NOT_STARTED && !isTeamsBalanced && <Grid item>
                        <Button variant="contained" color="primary" onClick={e => setaddPlayersDialogOpened(true)}>
                            Add members
                    </Button>
                    </Grid>}

                    {game.voteStatus === voteStatus.NOT_STARTED && isTeamsBalanced && <Grid item>
                        <Button variant="contained" color="primary" onClick={e => startVoting(game.id)}>
                            Start voting
                    </Button>
                    </Grid>}

                    {game.voteStatus === voteStatus.STARTED && isGameContainsPlayers && isTeamsBalanced && <Grid item>
                        <Button variant="contained" color="secondary" onClick={e => setVoteDialogOpened(true)}>
                            Vote for players
                    </Button>
                    </Grid>}

                    {game.voteStatus === voteStatus.STARTED && game.endVotingTimestamp &&
                        <>
                            <Grid item>
                                <Typography variant="h5" gutterBottom>
                                    Time left to vote
                            </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" gutterBottom>
                                    <CountDownTimer deadline={game.endVotingTimestamp} votingFinished={votingFinished} />
                                </Typography>
                            </Grid>
                        </>
                    }
                    
                    {game.voteStatus === voteStatus.FINISHED && <Grid item>
                        <Typography variant="h5" gutterBottom>
                            Voting is finished
                            </Typography>
                    </Grid>}

                    {game.voteStatus === voteStatus.NOT_STARTED && isGameContainsPlayers && !isTeamsBalanced && <Grid item>
                        <Button variant="contained" color="secondary" onClick={e => setTeamCountDialogOpened(true)}>
                            Balance teams
                        </Button>
                    </Grid>}

                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <MaterialTable
                    className={classes.paper}
                    title={t('PLAYERS')}
                    data={game.players}
                    columns={[
                        { title: t('NAME'), field: 'firstName' },
                        { title: t('RATING'), field: 'rating', type: 'numeric' }
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
                    <BalancedTeams
                        balancedTeams={game.balancedTeams.teams}
                        votes={votes}
                    />
                </Grid>
                : <Grid container item xs={12} sm={6} justify="center" alignItems="center">
                    <Grid item >
                        <h6 className="MuiTypography-root MuiTypography-h6" style={{textAlign: 'center'}}>
                            {t('GAME_PAGE_CTA')}
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
            gameId={game.id}
            open={voteDialogOpened}
            handleClose={e => setVoteDialogOpened(false)}
            onSubmit={votes => {
                sendVotes(votes)
                setVoteDialogOpened(false);
            }}
        />

        <TeamCountDialog
            playersCount={game.players && game.players.length}
            handleClose={e => setTeamCountDialogOpened(false)}
            onSubmit={(teamsCount, bots) => {
                balanceTeams(teamsCount, bots);
                setTeamCountDialogOpened(false);
            }}
            open={teamCountDialogOpened}
        />

    </>
    )
});
