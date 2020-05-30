import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//TODO create an abstaction
/* 
<DialogContainer>
actual form ....
</DialogContainer>
*/

export default function FormDialog({ open, handleClose, onSubmit }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [feedBack, setFeedBack] = useState({});
    const rows = fullScreen ? '' : '10';
    return (
        <Dialog open={open}
            fullScreen={fullScreen}
            onClose={handleClose}
            scroll='paper'
            aria-labelledby="form-dialog-title">
            <DialogContent>
                <TextField
                    multiline
                    autoFocus
                    margin="normal"
                    label="Feedback"
                    fullWidth
                    rowsMax={10}
                    rows={rows}
                    onChange={e => setFeedBack(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={onSubmit(feedBack)} color="primary">
                    Submit feedback
          </Button>
            </DialogActions>
        </Dialog>
    );
}
