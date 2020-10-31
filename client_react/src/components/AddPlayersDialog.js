import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { membersService } from '../_services';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default withTranslation() (function AddPlayersDialog({ t, open, handleClose, onSubmit, groupId, defaultPlayers }) {
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

    useEffect(() => {
        const fetchMembers = async () => {
            const playersId = defaultPlayers.map(player => player.id);
            const members = await membersService.getMembers(groupId);
            const membersToAdd = members.filter(member => playersId.indexOf(member.id) < 0);
            setPlayers(membersToAdd);
        };

        defaultPlayers && fetchMembers();
    }, [defaultPlayers]);

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    {t('ADD_PLAYERS')}
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
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('CANCEL')}
          </Button>
                <Button onClick={e => {
                    setChecked([]);
                    onSubmit(checked)
                }} color="primary">
                    {t('ADD')}
          </Button>
            </DialogActions>
        </Dialog>
    );
});
