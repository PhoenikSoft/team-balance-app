import React, { useState } from 'react';
import MaterialTable from 'material-table';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';


export default ({ bots, addBot, deleteBot }) => {
    const defaultBot = {
        firstName: 'New',
        lastName: 'Bot',
        rating: 50
    };

    const [newBot, setNewBot] = useState(defaultBot);

    return <>
        {bots.length ? <MaterialTable
            data={bots}
            columns={[
                { title: 'First name', field: 'firstName' },
                { title: 'Last name', field: 'lastName' },
                { title: 'Rating', field: 'rating', type: 'numeric' }
            ]}
            actions={[
                player => ({
                    icon: 'delete',
                    tooltip: 'Delete Player',
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
}