import React, { useState } from 'react';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { store } from '../../../index';
import { alertConstants } from '../../../_constants';

const mock_bots = [
    { name: 'bot_1', rating: 51 },
    { name: 'bot_2', rating: 15 }
];

export default () => {
    const defaultBot = {
        name: 'New bot name',
        rating: 50
    };

    const [players, setPlayers] = useState(mock_bots);
    const [newBot, setNewBot] = useState(defaultBot);

    const addNewBot = () => {
        if (players.filter(player => player.name === newBot.name).length) {
            store.dispatch({ type: alertConstants.ALERT_ERROR, text: alertConstants.BOT_EXISTS });
        } else {
            setPlayers([...players, { name: newBot.name, rating: newBot.rating }])
        };
    };

    return <>
        {players.length ? <MaterialTable
            data={players}
            columns={[
                { title: 'Name', field: 'name' },
                { title: 'Rating', field: 'rating', type: 'numeric' }
            ]}
            actions={[
                player => ({
                    icon: 'delete',
                    tooltip: 'Delete Player',
                    onClick: (event, playerToDelete) =>
                        setPlayers(players.filter(player => player.name !== playerToDelete.name))
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
            <TextField value={newBot.name}
                onChange={e => { setNewBot({ ...newBot, name: e.target.value }) }} />
            <TextField value={newBot.rating}
                onChange={e => { setNewBot({ ...newBot, rating: e.target.value }) }} />

            <ListItemSecondaryAction>

                <IconButton
                    onClick={addNewBot}>
                    <CheckIcon />
                </IconButton>

                {/* <IconButton onClick={() => setNewBot({})}>
                    <CancelIcon />
                </IconButton> */}
                {/* <IconButton onClick={() => onGroupDelete(groupId)}>
                    <DeleteIcon />
                </IconButton> */}
            </ListItemSecondaryAction>
        </ListItem>

    </>
}