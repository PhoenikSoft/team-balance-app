import React, { useState } from 'react';
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


function getSteps() {
    return ['Choose how much teams you want to generate', 'Add unregistered players'];
};



export default function ({ open, handleClose, onSubmit }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [teamsCount, setTeamsCount] = useState('2');
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
    const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);
    const closeModal = () => {
        handleClose();
        handleReset();
    };

    const getStepContent = step => {
        switch (step) {
            case 0:
                return <>
                    <ChooseTeamCountStep teamsCount={teamsCount} setTeamsCount={setTeamsCount} />
                    <DialogActions>
                        <Button onClick={closeModal} color='primary'>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleNext}
                            color='primary'>
                            Proceed to team players
                        </Button>
                    </DialogActions>
                </>;
            case 1:
                return <>
                    <AddBotsStep />
                    <DialogActions>
                        <Button onClick={closeModal} color='primary'>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleBack}
                            color='primary'>
                            Back to balance Teams
                        </Button>
                        <Button
                            onClick={() => onSubmit(teamsCount)}
                            color='primary'>
                            Balance Teams
                        </Button>
                    </DialogActions>
                </>;
            default:
                return 'Unknown step';
        }
    }

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullScreen={fullScreen}>
        <DialogContent>
            <DialogContentText>
                Choose how much teams you want to generate
            </DialogContentText>

            {/* <ChooseTeamCountStep teamsCount={teamsCount} setTeamsCount={setTeamsCount} /> */}

            <Stepper activeStep={activeStep}>
                {steps.map(label =>
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <div>
                <Typography>{getStepContent(activeStep)}</Typography>
            </div>

        </DialogContent>
    </Dialog>
}