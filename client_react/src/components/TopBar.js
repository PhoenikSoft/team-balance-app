import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import Dialog from './FeedBackDialog';
import { userActions } from '../actions';



const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    spacing: {
        '& > *': {
            margin: '4px'
        },
    },
    spacingMobile: {
        '& > *': {
            margin: '8px'
        },
    },
}));


export default function PrimarySearchAppBar({ onLogoutClick, submitFeedback, onAppNameClick }) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const onProfileClick = userActions.goToProfile;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = text => () => {
        submitFeedback(text);
        handleClose();
    };


    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap onClick={onAppNameClick}>
                        <div className={classes.sectionDesktop}>
                            Team Balance
                        </div>
                        <div className={classes.sectionMobile}>TB</div>
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <div className={classes.spacing}>
                            <Button variant="contained" color="primary" startIcon={<FeedbackOutlinedIcon />}
                                onClick={handleClickOpen}>
                                Leave Feedback
                            </Button>
                            <Button variant="contained" color="primary" startIcon={<AccountCircle />}
                                onClick={onProfileClick}>
                                Profile
                            </Button>
                            <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />}
                                onClick={onLogoutClick}>
                                Logout
                            </Button>
                        </div>

                    </div>
                    <div className={classes.sectionMobile}>
                        <div className={classes.spacingMobile}>
                            <FeedbackOutlinedIcon fontSize="large" onClick={handleClickOpen} />
                            <AccountCircle fontSize="large" onClick={onProfileClick} />
                            <ExitToAppIcon fontSize="large" color="secondary" onClick={onLogoutClick} />
                        </div>
                    </div>

                </Toolbar>
            </AppBar>
            <Dialog open={open} handleClose={handleClose} onSubmit={onSubmit} />
        </div>
    );
}