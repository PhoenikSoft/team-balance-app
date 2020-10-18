import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withTranslation } from 'react-i18next';


export default withTranslation() (function AddGroupDialog({ t, open, handleClose, onSubmit }) {
    const [groupName, setGroupName] = useState({})
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    {t('ADD_GROUP_DIALOG_NEW_GROUP')}
          </DialogContentText>
                <TextField
                    autoFocus 
                    margin="dense"
                    id="groupName"
                    label={t('ADD_GROUP_INPUT_NAME')}
                    type="text"
                    fullWidth
                    onChange={e => setGroupName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    {t('CANCEL')}
          </Button>
                <Button onClick={onSubmit(groupName)} color="primary">
                    {t('CREATE')}
          </Button>
            </DialogActions>
        </Dialog>
    );
});
