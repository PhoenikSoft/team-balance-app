import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import ChooseTeamCountStep from './ChooseTeamCountStep';
import AddBotsStep from './AddBotsStep';
import { store } from '../../../index';
import { alertConstants } from '../../../_constants';

const MINIMAL_BALANCING_PLAYERS_AMOUNT = 6;


export default withTranslation()(function ({ t, open, handleClose, onSubmit, playersCount }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [teamsCount, setTeamsCount] = useState('2');
    const [activeStep, setActiveStep] = React.useState(0);
    const [bots, setBots] = useState([]);
    const steps = [t('TEAM_COUNT_STEP_1'), t('TEAM_COUNT_STEP_2')];

    const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
    const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);
    const closeModal = () => {
        handleClose();
        handleReset();
    };
    const addNewBot = ({ lastName, firstName, rating }) => {
        const botsExists = bots
            .filter(player => player.lastName === lastName && player.firstName === firstName).length;

        if (botsExists) {
            store.dispatch({ type: alertConstants.ALERT_ERROR, text: alertConstants.BOT_EXISTS });
        } else if (Number.parseInt(rating) > 100 || Number.parseInt(rating) < 1) {
            store.dispatch({ type: alertConstants.ALERT_ERROR, text: alertConstants.PROVIDE_VALID_RATING });
        } else {
            setBots([...bots, { lastName, firstName, rating }]);
        };
    };
    const deleteBot = botToDelete => setBots(bots.filter(player => player.name !== botToDelete.name))

    const getStepContent = step => {
        switch (step) {
            case 0:
                return <ChooseTeamCountStep teamsCount={teamsCount} setTeamsCount={setTeamsCount} />
            case 1:
                return <AddBotsStep bots={bots} addBot={addNewBot} deleteBot={deleteBot} />
            default:
                return 'Unknown step';
        };
    };

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullScreen={fullScreen}>
        <DialogContent>
            <DialogContentText>
                {t('CHOOSE_TEAMS_COUNT')}
            </DialogContentText>

            <Stepper activeStep={activeStep}>
                {steps.map(label =>
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Typography>{getStepContent(activeStep)}</Typography>
        </DialogContent>

        <DialogActions>
            <Button onClick={closeModal} color='primary'>
                {t('CANCEL')}
            </Button>
            {activeStep === 0 &&
                <Button
                    onClick={handleNext}
                    color='primary'>
                    {t('TEAM_COUNT_PROCEED_TO_STEP_2')}
                </Button>}

            {activeStep === 1 &&
                <Button
                    onClick={handleBack}
                    color='primary'>
                    {t('TEAM_COUNT_GO_BACK_TO_STEP_1')}
                </Button>}
            <Button
                onClick={() => onSubmit(teamsCount, bots)}
                disabled={bots.length + playersCount < MINIMAL_BALANCING_PLAYERS_AMOUNT}
                color='primary'>
                {t('BALANCE_TEAMS')}
            </Button>
        </DialogActions>
    </Dialog>
});