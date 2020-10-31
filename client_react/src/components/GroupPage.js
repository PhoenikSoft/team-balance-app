import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import { authHelper } from '../_helpers';
import Button from '@material-ui/core/Button';
import AddGameDialog from './AddGameDialog';
import Typography from "@material-ui/core/Typography";
import { withTranslation } from 'react-i18next';


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
        paddingTop: '22px',
    },
}));

function isCurrentUser(rowData) {
    return rowData.id == authHelper.getUserId();
}

export default withTranslation() (function GroupPage(
    { t, groupFromGlobalState, fetchGroup, deleteMember, deleteGame, copyLink, addGame, onGameRowClick }) {
    let group = groupFromGlobalState;
    const classes = useStyles();
    const [gameAddDialogOpened, setAddGameDialog] = useState(false);
    const checkRemoveMemberDisabled = rowData =>
        (authHelper.isGroupAdmin(group.id) && isCurrentUser(rowData)) ||
        (!authHelper.isGroupAdmin(group.id) && !isCurrentUser(rowData));

    useEffect(() => {
        const fetch = async () => {
            const action = await fetchGroup();
            if (action) {
                group = action.groups;
            }
        };
        fetch();
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
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
                                {t('ADD_GAME')}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={e => copyLink(group.ref)}>
                                {t('COPY_GROUP_INVITE_LINK')}
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
                }

                <Grid item xs={12} sm={6}>
                    <MaterialTable
                        className={classes.paper}
                        title={t('MEMBERS')}
                        data={group.members}
                        columns={[
                            //{ title: 'Num', field: 'id', type: 'numeric' },
                            { field: 'firstName' },
                            { title: t('RATING'), field: 'rating', type: 'numeric' },
                        ]}
                        actions={[
                            rowData => ({
                                icon: 'delete',
                                tooltip: t('DELETE_MEMBER'),
                                onClick: (event, rowData) => deleteMember(rowData.id, group.id),
                                disabled: checkRemoveMemberDisabled(rowData),
                            }),
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            search: false,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MaterialTable
                        className={classes.paper}
                        onRowClick={onGameRowClick}
                        title={t('GAMES')}
                        data={group.games}
                        columns={[
                            //{ title: 'Num', field: 'id', type: 'numeric' },

                            { field: 'name' },
                            { title: t('GAME_DATE'), field: 'startDateTime' }

                            //players number

                        ]}
                        actions={[
                            () => ({
                                icon: 'delete',
                                tooltip: t('DELETE_GAME'),
                                onClick: (event, rowData) => deleteGame(rowData.id),
                                disabled: !authHelper.isGroupAdmin(group.id),
                            }),
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            search: false,
                            sorting: true
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
});
