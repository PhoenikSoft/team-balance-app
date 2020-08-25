import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import { authHelper } from '../_helpers';
import Button from '@material-ui/core/Button';
import AddGameDialog from './AddGameDialog';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    buttonsBar: {
        paddingTop: '22px'
    }
}));


export default function GroupPage(
    { groupFromGlobalState, fetchGroup, deleteMember, deleteGame, copyLink, addGame, onGameRowClick }) {
    let group = groupFromGlobalState;
    const classes = useStyles();
    const [gameAddDialogOpened, setAddGameDialog] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const action = await fetchGroup();
            if (action) {
                group = action.groups;
            };
        };
        fetch();
    }, []);

    return (
        <div>
            <Grid container spacing={3} >
                {authHelper.isGroupAdmin(group.id) && <Grid item xs={12} sm={12}>
                    <Grid
                        className={classes.buttonsBar}
                        container
                        justify="flex-start"
                        spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom>
                                {group.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={e => setAddGameDialog(true)}>
                                Add Game
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={e => copyLink(group.ref)}>
                                Copy link to clipboard
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
                }

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
                        onRowClick={onGameRowClick}
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
                                onClick: (event, rowData) => deleteGame(rowData.id),
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
            <AddGameDialog
                open={gameAddDialogOpened}
                handleClose={e => setAddGameDialog(false)}
                onSubmit={game => {
                    addGame(game, group.id);
                    setAddGameDialog(false);
                }}
            />
        </div>
    )
}
