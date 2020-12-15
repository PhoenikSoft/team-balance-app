import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';

//TODO create an abstaction
/* 
<DialogContainer>
actual form ....
</DialogContainer>
*/

export default withTranslation()(function FormDialog({ t, open, handleClose, onSubmit }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [feedBack, setFeedBack] = useState({});
    const rows = fullScreen ? '' : '10';
    const rowsMax = fullScreen ? '' : 10;
    return (
        <Dialog open={open}
            fullScreen={fullScreen}
            onClose={handleClose}
            scroll='paper'
            maxWidth='sm'
            fullWidth
            aria-labelledby="form-dialog-title">
            <DialogContent>
                <TextField
                    multiline
                    autoFocus
                    margin="normal"
                    label={t('FEEDBACK')}
                    fullWidth
                    rowsMax={rowsMax}
                    rows={rows}
                    onChange={e => setFeedBack(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('CANCEL')}
                </Button>
                <Button onClick={onSubmit(feedBack)} color="primary">
                    {t('SUBMIT_FEEDBACK')}
                </Button>
            </DialogActions>
        </Dialog>
    );
});
