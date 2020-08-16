import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function ({ open, handleClose, onSubmit }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [teamsCount, setTeamsCount] = useState('2');
    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullScreen={fullScreen}>
        <DialogContent>
            <DialogContentText>
                Choose how much teams you want to generate
            </DialogContentText>

            <FormControl component='fieldset'>
                <RadioGroup value={teamsCount} onChange={e => {
                    setTeamsCount(e.target.value)
                }}>
                    <FormControlLabel value='2' control={<Radio />} label='2 teams' />
                    <FormControlLabel value='3' control={<Radio />} label='3 teams' />
                    <FormControlLabel value='4' control={<Radio />} label='4 teams' />
                </RadioGroup>
            </FormControl>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Cancel
                </Button>
                <Button onClick={() => {
                    onSubmit(teamsCount)
                }}
                    color='primary'>
                    Balance Teams
            </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
}