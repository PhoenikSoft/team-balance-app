import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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

                        <div className={classes.spacing}>

                            <ButtonGroup variant="contained" color="primary" >
                                <Button onClick={e => changeLanguage('en')}>EN</Button>
                                <Button onClick={e => changeLanguage('uk')}>UA</Button>
                            </ButtonGroup>

                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={event => changeLanguage(event.target.value)}
                                label="Language"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'en'}>en</MenuItem>
                                <MenuItem value={'ua'}>ua</MenuItem>
                                <MenuItem value={'ru'}>ru</MenuItem>
                            </Select>

                            <Button variant="contained" color="primary" startIcon={<FeedbackOutlinedIcon />}
                                onClick={handleClickOpen}>
                                {t('LEAVE_FEEDBACK')}
                            </Button>
                            <Button variant="contained" color="primary" startIcon={<AccountCircle />}
                                onClick={onProfileClick}>
                            </Button>
                            <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />}
                                onClick={onLogoutClick}>
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
});