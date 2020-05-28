import 'date-fns';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';

export default function AddGroupDialog({ open, handleClose, onSubmit }) {
    const [gameName, setGameName] = useState({});
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    Add Group
          </DialogContentText>
                <form autoComplete="off">
                    <TextField

                        autoFocus
                        margin="dense"
                        id="groupName"
                        label="Game name"
                        type="text"
                        fullWidth
                        onChange={e => setGameName(e.target.value)}
                    />
                </form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        variant="inline"
                        ampm={false}
                        label="With keyboard"
                        value={selectedDate}
                        onChange={handleDateChange}
                        onError={console.log}
                        disablePast
                        format="yyyy/MM/dd HH:mm"
                    />
                </MuiPickersUtilsProvider>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={() => {
                    onSubmit({
                        name: gameName,
                        startDateTime: selectedDate.toISOString()
                    });
                }} color="primary">
                    Add Game
          </Button>
            </DialogActions>
        </Dialog>
    );
}
