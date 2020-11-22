import React, { useState } from 'react';
import LocalizedMaterialTable from '../LocalizedMaterialTable';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { store } from './../../index';
import { alertConstants } from './../../_constants';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';


export default withTranslation()(function ({ t, open, handleClose, onSubmit, players, bots, setBots }) {
    const defaultBot = {
        firstName: t('NEW'),
        lastName: t('BOT'),
        rating: 50
    };

    const addNewBot = ({ lastName, firstName, rating }) => {
        const botsExists = [...bots, ...players]
            .filter(player => player.lastName === lastName && player.firstName === firstName).length;

        if (botsExists) {
            store.dispatch({ type: alertConstants.ALERT_ERROR, text: alertConstants.BOT_EXISTS });
        } else if (Number.parseInt(rating) > 100 || Number.parseInt(rating) < 1) {
            store.dispatch({ type: alertConstants.ALERT_ERROR, text: alertConstants.PROVIDE_VALID_RATING });
        } else {
            setBots([...bots, { lastName, firstName, rating }]);
            setLocalBots([...bots, { lastName, firstName, rating }]);
        };
    };
    const deleteBot = botToDelete => setBots(bots.filter(player => player.name !== botToDelete.name))


    const [newBot, setNewBot] = useState(defaultBot);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [localBots, setLocalBots] = useState([]);
    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullScreen={fullScreen}>
        <DialogContent>
            <DialogContentText>
                {t('CHOOSE_TEAMS_COUNT')}
            </DialogContentText>
            {bots.length ? <LocalizedMaterialTable
                data={localBots}
                columns={[
                    { title: t('FIRST_NAME'), field: 'firstName' },
                    { title: t('LAST_NAME'), field: 'lastName' },
                    { title: t('RATING'), field: 'rating', type: 'numeric' }
                ]}
                actions={[
                    () => ({
                        icon: 'delete',
                        tooltip: t('DELETE_PLAYER'),
                        onClick: (event, botToDelete) => deleteBot(botToDelete)
                    })
                ]}
                options={{
                    actionsColumnIndex: -1,
                    search: false,
                    paging: false,
                    showTitle: false,
                    showEmptyDataSourceMessage: false,
                    toolbar: false,
                }}
            />
                : <div>No bots added</div>}

            <ListItem>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={3}>
                        <TextField value={newBot.firstName}
                            onChange={e => { setNewBot({ ...newBot, firstName: e.target.value }) }} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField value={newBot.lastName}
                            onChange={e => { setNewBot({ ...newBot, lastName: e.target.value }) }} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField value={newBot.rating} type="number"
                            onChange={e => { setNewBot({ ...newBot, rating: e.target.value }) }} />
                    </Grid>

                    <Grid item >
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={e => addNewBot(newBot)}>
                                <CheckIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </Grid>
                </Grid>
            </ListItem>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color='primary'>
                {t('CANCEL')}
            </Button>

            <Button
                onClick={() => {
                    onSubmit(bots);
                    setLocalBots([]);
                    handleClose();
                }}
                disabled={!bots.length}
                color='primary'>
                {t('ADD_BOTS')}
            </Button>
        </DialogActions>

    </Dialog >
});