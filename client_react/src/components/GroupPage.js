import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import { groups } from '../reducers/group.reducer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { authHelper } from '../_helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        //padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


export default function GroupPage({ groupFromGlobalState, fetchGroup, deleteMember, deleteGame }) {
    let group = groupFromGlobalState;
    const classes = useStyles();

    useEffect(() => {
        const fetch = async () => {
            const action = await fetchGroup();
            group = action.groups;
        };
        fetch();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <MaterialTable
                    className={classes.paper}
                    title='Members'
                    data={group.members}
                    columns={[
                        //{ title: 'Num', field: 'id', type: 'numeric' },
                        { title: 'Name', field: 'firstName' },
                        { title: 'Rating', field: 'rating', type: 'numeric' },
                    ]}
                    actions={[
                        rowData => ({
                            icon: 'delete',
                            tooltip: 'Delete Member',
                            onClick: (event, rowData) => deleteMember(rowData.id, group.id),
                            disabled: !authHelper.isGroupAdmin(group.id) || rowData.id == authHelper.getCookie('userId')
                        })
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        search: false
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MaterialTable
                    className={classes.paper}
                    title='Games'
                    data={group.games}
                    columns={[
                        //{ title: 'Num', field: 'id', type: 'numeric' },
                        { title: 'Name', field: 'name' },
                        { title: 'Start date', field: 'startDateTime' }
                        //players number

                    ]}
                    actions={[
                        rowData => ({
                            icon: 'delete',
                            tooltip: 'Delete Game',
                            onClick: (event, rowData) => deleteGame(rowData.id, group.id),
                            disabled: !authHelper.isGroupAdmin(group.id)
                        })
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        search: false
                    }}
                />
            </Grid>

        </Grid>
    )
}