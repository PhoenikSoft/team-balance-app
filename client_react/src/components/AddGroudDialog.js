import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function AddGroupDialog({ open, handleClose, onSubmit }) {
    const [groupName, setGroupName] = useState({})
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    Add Group
          </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="groupName"
                    label="Group name"
                    type="text"
                    fullWidth
                    onChange={e => setGroupName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={onSubmit(groupName)} color="primary">
                    Add
          </Button>
            </DialogActions>
        </Dialog>
    );
}
