import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

import { authHelper } from '../../_helpers';
import AddPlayersDialog from '../Dialogs/AddPlayersDialog';
import VoteDialog from '../Dialogs/voteDialog';
import TeamCountDialog from '../Dialogs/teamCountDialog';
import BalancedTeams from './BalancedTeams';
import CountDownTimer from './CountdownTimer';
import LocalizedMaterialTable from '../LocalizedMaterialTable';
import AddMembersStep from './AddMembersStep';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import AddBotsStep from './AddBotsDialog';
import ChooseTeamCountStep from './ChooseTeamCountStep';

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

export default withTranslation()(function GamePage(
    { t,
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
        votingFinished,
        addBots }) {
    const steps = ['Add members', 'Add unregistered', 'Choose teams amount', 'Balance teams'];
    const defaultStep = game.balancedTeams ? 3 : 0;
    const [activeStep, setActiveStep] = useState(defaultStep);
    const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
    const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
    const [addPlayersDialogOpened, setaddPlayersDialogOpened] = useState(false);
    const [addBotsDialogOpened, setAddBotsDialogOpened] = useState(false);
    const classes = useStyles();
    const [teamsCount, setTeamsCount] = useState('2');
    const [bots, setBots] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            await Promise.all([fetchGame(), getVotes()]);
        };
        fetch();
    }, []);

    const getStepContent = step => {
        switch (step) {
            case 0:
                return <>
                    <Grid item>
                        <IconButton variant="contained" color="primary"
                            onClick={e => setaddPlayersDialogOpened(true)}>
                            <PersonAddIcon fontSize="large" />
                        </IconButton>
                    </Grid>

                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Next
                            </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <LocalizedMaterialTable
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
                                    tooltip: t('DELETE_PLAYER'),
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
                </>
            case 1:
                return <>
                    <Grid item >
                        <Button variant="contained" color="primary" onClick={handleBack}>
                            Back
                            </Button>
                    </Grid>

                    <Grid item  >
                        <IconButton variant="contained" color="primary"
                            onClick={e => setAddBotsDialogOpened(true)}>
                            <PersonAddIcon fontSize="large" />
                        </IconButton>
                    </Grid>

                    <Grid item >
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Next
                            </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizedMaterialTable
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
                                    tooltip: t('DELETE_PLAYER'),
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
                </>
            case 2:
                return <>
                    <Grid item >
                        <Button variant="contained" color="primary" onClick={handleBack}>
                            Back
                            </Button>
                    </Grid>
                    <Grid item >
                        <Button variant="contained" color="primary" onClick={async () => {
                            await balanceTeams(teamsCount, bots);
                            handleNext();
                        }}>
                            balance teams
                            </Button>
                    </Grid>

                    <Grid item xs={12} style={{ 'display': 'flex', 'justifyContent': 'center' }}>
                        <ChooseTeamCountStep
                            teamsCount={teamsCount}
                            setTeamsCount={setTeamsCount}
                        />
                    </Grid>
                </>;
            case 3:
                return <Grid item xs={12} >
                    <BalancedTeams
                        balancedTeams={game.balancedTeams.teams}
                        votes={votes}
                    />
                </Grid>

            default:
                return 'Unknown step';
        };
    };

    return <>

        <Stepper activeStep={activeStep}>
            {steps.map(label =>
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            )}
        </Stepper>


        <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}>
            {getStepContent(activeStep)}
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

        <AddBotsStep
            open={addBotsDialogOpened}
            handleClose={e => setAddBotsDialogOpened(false)}
            onSubmit={addBots}
            players={game.players || []}
            bots={bots}
            setBots={setBots}
        />
    </>
});


