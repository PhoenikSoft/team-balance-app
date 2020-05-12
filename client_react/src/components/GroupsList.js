import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';


const useStyles = makeStyles((theme) => ({
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

export default function GroupsList({ groups, onEditSubmit }) {
    const classes = useStyles();

    //const [, setGroups] = React.useState(groups);

    //const getGroupName = groupId => groups.filter(group => group.id === groupId).name;
    // const setGroupName = (groupId, name) => groups.map(group => {
    //     if (group.id === groupId) {
    //         group.name = name;
    //         return group;
    //     } else {
    //         return group;
    //     };
    // });

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>Your groups</Typography>
                    <div className={classes.demo}>
                        <List dense={false}>
                            {generate(groups, <GroupsListItem />)}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );

    function GroupsListItem({ groupId, groupName }) {
        const [edit, setEdit] = React.useState({});

        return (
            <ListItem>
                {edit[groupId]
                    ? <TextField
                        value={edit[groupId]}
                        onChange={e => { setEdit({ [groupId]: e.target.value }) }}
                    />
                    : <ListItemText primary={groupName} value={groupName} />}

                <ListItemSecondaryAction>

                    {edit[groupId]
                        ? <><IconButton onClick={() => onEditSubmit(groupId, edit[groupId])}
                            edge="end" aria-label="submit group name">
                            <CheckIcon />
                        </IconButton>
                            <IconButton onClick={() => setEdit({})}
                                edge="end" aria-label="edit group">
                                <CancelIcon />
                            </IconButton>
                        </>
                        : <IconButton onClick={() => setEdit({ [groupId]: groupName })}
                            edge="end" aria-label="edit group">
                            <EditIcon />
                        </IconButton>}

                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}


