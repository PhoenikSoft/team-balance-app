import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import BalancedTeams from '../../gamePage/BalancedTeams';


export default function ({ open, handleClose, balancedTeams, onSubmit, votes }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen={fullScreen}>
        <DialogContent>
            <DialogContentText>
                Vote for the players you played with
            </DialogContentText>
            <BalancedTeams
                balancedTeams={balancedTeams}
                showTitle={false}
                showSlider={true}
                showTitleTable={false}
                showVotes={true}
                showCurrentPlayer={false}
            />

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {
                    onSubmit(votes)
                }}
                    //disabled={!gameName}
                    color="primary">
                    Vote
            </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
}