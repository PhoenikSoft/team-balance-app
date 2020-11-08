import React, { useState } from 'react';
import LocalizedMaterialTable from '../../LocalizedMaterialTable';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';



export default withTranslation()(function ({ t, bots, addBot, deleteBot }) {
    const defaultBot = {
        firstName: t('NEW'),
        lastName: t('BOT'),
        rating: 50
    };

    const [newBot, setNewBot] = useState(defaultBot);

    return <>
        {bots.length ? <LocalizedMaterialTable
            data={bots}
            columns={[
                { title: t('FIRST_NAME'), field: 'firstName' },
                { title: t('LAST_NAME'), field: 'lastName' },
                { title: t('RATING'), field: 'rating', type: 'numeric' }
            ]}
            actions={[
                player => ({
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
                            onClick={e => addBot(newBot)}>
                            <CheckIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </Grid>
            </Grid>
        </ListItem>

    </>
});