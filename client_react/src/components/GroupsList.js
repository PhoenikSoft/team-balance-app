import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddGroupDialog from './AddGroudDialog';


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
        marginTop: '20px',
        cursor: 'pointer'
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
export default function GroupsList({ groupsFromGlobalState, fetchGroups, onEditSubmit, isGroupAdmin, onGroupDelete,
    onGroupAdd, isGroupCreatedByCurrentUser, goToGroupPage }) {
    let groups = groupsFromGlobalState;
    const classes = useStyles();
    const [groupdDialogOpened, setAddGroupDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const action = await fetchGroups();
            groups = action.groups;
        };
        fetchData();
    }, []);


    return (
        <div className={classes.rootContainer}>
            <div className={classes.root}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" className={classes.title}>Your groups</Typography>
                        <div className={classes.demo}>
                            <List dense={false}>
                                {generate(groups, <GroupsListItem />)}
                                <ListItem button>
                                    <ListItemSecondaryAction
                                        className={classes.addButton}
                                        onClick={e => setAddGroupDialog(true)}>
                                        <Typography  variant="button" >Add group</Typography>
                                        <IconButton edge="end" aria-label="add group">
                                            <AddCircleOutlineOutlinedIcon
                                                color="secondary"
                                                fontSize="large"
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </div>
                    </Grid>
                </Grid >
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

                <ListItemSecondaryAction>

                    {edit[groupId]
                        ? <><IconButton onClick={() => onEditSubmit(groupId, edit[groupId])}
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
                    {(isGroupAdmin(groupId) || isGroupCreatedByCurrentUser(groupId)) &&
                        <IconButton onClick={() => onGroupDelete(groupId)}
                            aria-label="edit group">
                            <DeleteIcon />
                        </IconButton>}

                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}


