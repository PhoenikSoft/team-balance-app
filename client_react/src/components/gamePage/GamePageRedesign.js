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
        votingFinished }) {
    const steps = ['Add members', 'Add unregistered', 'Choose teams amount', 'Balance teams'];
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
    const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
    const [addPlayersDialogOpened, setaddPlayersDialogOpened] = useState(false);
    const classes = useStyles();

    const getStepContent = step => {
        switch (step) {
            case 0:
                return <>
                    <Grid item xs={12} >
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={e => setaddPlayersDialogOpened(true)}>
                                {t('ADD_MEMBERS')}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Next step
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >

                        <AddMembersStep
                            game={game}
                            deletePlayer={deletePlayer}
                            groupId={groupId}
                            className={classes.paper} />
                    </Grid>
                </>
            
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
        <Grid container spacing={3}>
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
    </>
});


