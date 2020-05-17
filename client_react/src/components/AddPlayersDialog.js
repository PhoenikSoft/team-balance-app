import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { membersService } from '../_services';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function AddPlayersDialog({ open, handleClose, onSubmit, groupId }) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [players, setPlayers] = useState([]);


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const getCheckedMembers = () => {
        return players.filter(players => checked.indexOf(players.id) > -1);
    };

    useEffect(() => {
        const fetchMembers = async () => {
            const members = await membersService.getMembers(groupId);
            setPlayers(members);
        };
        fetchMembers();
    }, []);

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    Add Group
          </DialogContentText>
                <List className={classes.root}>
                    {players.map((player) => {
                        const labelId = `checkbox-list-label-${player.id}`;
                        return (
                            <ListItem key={player.id} dense button onClick={handleToggle(player.id)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(player.id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${player.firstName} ${player.lastName}`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments">
                                        <CommentIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={onSubmit(getCheckedMembers())} color="primary">
                    Add Members
          </Button>
            </DialogActions>
        </Dialog>
    );
}
