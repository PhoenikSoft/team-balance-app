import 'date-fns';
import moment from "moment";
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MomentUtils from "@date-io/moment";
import {
    MuiPickersUtilsProvider,
    DatePicker,
    TimePicker
} from "@material-ui/pickers";
import { withTranslation } from 'react-i18next';
import "moment/locale/en-gb";
import "moment/locale/ru";
import i18next from "i18next";


export default withTranslation()(function AddGroupDialog({ t, open, handleClose, onSubmit }) {
    const [gameName, setGameName] = useState('');
    const [selectedDate, handleDateChange] = React.useState(moment());
    const [selectedTime, handleTimeChange] = React.useState(moment());

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    {t('ADD_GAME')}
                </DialogContentText>
                <form autoComplete="off">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="groupName"
                        label={t('GAME_NAME')}
                        type="text"
                        fullWidth
                        onChange={e => setGameName(e.target.value)}
                    />
                </form>
                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={i18next.language}>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        disablePast
                        format="yyyy/MM/dd"
                    />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <TimePicker
                        ampm={false}
                        value={selectedTime}
                        onChange={handleTimeChange}
                        disablePast
                        format="HH:mm"
                    />
                </MuiPickersUtilsProvider>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('CANCEL')}
                </Button>
                <Button onClick={() => {
                    onSubmit({
                        name: gameName,
                        startDateTime: selectedDate.hours(selectedTime.hours()).minutes(selectedTime.minutes()).toISOString()
                    });
                }}
                    disabled={!gameName}
                    color="primary">
                    {t('ADD_GAME')}
                </Button>
            </DialogActions>
        </Dialog>
    );
})
