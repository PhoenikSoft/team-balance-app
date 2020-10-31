import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import i18next from "i18next";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import Dialog from './FeedBackDialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { navigation } from '../_helpers';

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
    cursor: {
        cursor: 'pointer'
    },
    select: {

        background: 'white',

        fontWeight: 200,
        borderStyle: 'none',
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 12,
        paddingTop: 14,
        paddingBottom: 15,
        boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
        "&:focus": {
            borderRadius: 12,
            background: 'white',
            borderColor: '#3f51b5'
        },
    },
    icon: {
        color: '#3f51b5',
        right: 12,
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none'
    },
    paper: {
        borderRadius: 12,
        marginTop: 8
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
        background: 'white',
        "& li": {
            fontWeight: 200,
            paddingTop: 12,
            paddingBottom: 12,
        },
        "& li:hover": {
            background: '#3f51b5'
        },
        "& li.Mui-selected": {
            color: 'white',
            background: '#3f51b5'
        },
        "& li.Mui-selected:hover": {
            background: '#8f99d3'
        }
    }
}));


export default withTranslation()(function PrimarySearchAppBar({ t, onLogoutClick, submitFeedback, onAppNameClick, changeLanguage }) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const onProfileClick = navigation.goToProfile;

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

    // moves the menu below the select input
    const menuProps = {
        classes: {
            paper: classes.paper,
            list: classes.list
        },
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        },
        getContentAnchorEl: null
    };

    const ChangeLanguageDropDown = () => <div style={{ marginRight: '8px' }}>
        <Select
            onChange={event => changeLanguage(event.target.value)}
            value={i18next.language}
            classes={{ root: classes.select }}
            MenuProps={menuProps}>
            <MenuItem value='en'>EN</MenuItem>
            <MenuItem value='uk'>UA</MenuItem>
            <MenuItem value='ru'>RU</MenuItem>
        </Select >
    </div>;

    const Actions = () => <>
        <FeedbackOutlinedIcon fontSize="large" onClick={handleClickOpen} />
        <AccountCircle fontSize="large" onClick={onProfileClick} />
        <ExitToAppIcon fontSize="large" color="secondary" onClick={onLogoutClick} />
    </>;

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap onClick={onAppNameClick}>
                        <div className={`${classes.sectionDesktop} ${classes.cursor}`}>
                            Team Balance
                        </div>
                        <div className={classes.sectionMobile}>TB</div>
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <ChangeLanguageDropDown />
                        <div className={classes.spacing}>
                            <Actions />
                        </div>
                    </div>
                    <div className={classes.sectionMobile}>
                        <ChangeLanguageDropDown />
                        <div className={classes.spacingMobile}>
                            <Actions />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Dialog open={open} handleClose={handleClose} onSubmit={onSubmit} />
        </div>
    );
});