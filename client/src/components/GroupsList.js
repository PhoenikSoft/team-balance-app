import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddGroupDialog from './AddGroupDialog';
import { withTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    addButton: {
        //cursor: 'pointer',
        marginRight: '26px'
    }
}));

function generate(groups, element) {
    return groups.map(group =>
        React.cloneElement(element, {
            key: group.id,
            groupId: group.id,
            groupName: group.name
        })
    );
}

// this component uses global state to render groups
export default withTranslation() (function GroupsList({ t, groupsFromGlobalState, fetchGroups, onEditSubmit, isGroupAdmin, onGroupDelete,
    onGroupAdd, isGroupCreatedByCurrentUser, goToGroupPage }) {
    let groups = groupsFromGlobalState;
    const classes = useStyles();
    const [groupdDialogOpened, setAddGroupDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const action = await fetchGroups();
            groups = action?.groups;
        };
        fetchData();
    }, []);


    return (
        <div className={classes.rootContainer}>
            <div className={classes.root}>
            <div>{t('GROUPS_LIST_DESCRIPTION')}</div>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" className={classes.title}>{t('YOUR_GROUPS')}</Typography>
                        <div className={classes.demo}>
                            <List dense={false}>
                                {generate(groups, <GroupsListItem />)}
                            </List>
                        </div>
                    </Grid>
                </Grid >
                <Grid container justify="flex-end">
                    <Grid item >
                        <div
                            className={classes.addButton}
                            onClick={e => setAddGroupDialog(true)}>
                            <Button
                                endIcon={<AddCircleOutlineOutlinedIcon
                                    color="secondary"
                                    fontSize="large"
                                />}>
                                {t('ADD_GROUP')}
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                <AddGroupDialog
                    open={groupdDialogOpened}
                    handleClose={e => setAddGroupDialog(false)}
                    onSubmit={name => () => {
                        onGroupAdd(name);
                        setAddGroupDialog(false);
                    }}
                />
            </div >
        </div>
    );

    function GroupsListItem({ groupId, groupName }) {
        const [edit, setEdit] = React.useState({});

        return (
            <ListItem button onClick={e => {
                !edit[groupId] && goToGroupPage(groupId)
            }}>
                {edit[groupId]
                    ? <TextField
                        value={edit[groupId]}
                        onChange={e => { setEdit({ [groupId]: e.target.value }) }}
                    />
                    : <ListItemText primary={groupName} value={groupName} />}

                {(isGroupAdmin(groupId) || isGroupCreatedByCurrentUser(groupId)) &&
                    <ListItemSecondaryAction>
                        {edit[groupId]
                            ? <> <IconButton onClick={() => {
                                if (edit[groupId] !== groupName) {
                                   return onEditSubmit(groupId, edit[groupId]);
                                }
                                setEdit({});
                            }}
                                aria-label="submit group name">
                                <CheckIcon />
                            </IconButton>
                                <IconButton onClick={() => setEdit({})}
                                    aria-label="edit group">
                                    <CancelIcon />
                                </IconButton>
                            </>
                            : <IconButton onClick={() => setEdit({ [groupId]: groupName })}
                                aria-label="edit group">
                                <EditIcon />
                            </IconButton>}
                        <IconButton onClick={() => onGroupDelete(groupId)}
                            aria-label="edit group">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>}
            </ListItem>
        )
    }
});
