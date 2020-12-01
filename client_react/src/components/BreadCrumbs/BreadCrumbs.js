import React, { useState, useRef, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import { navigation, urlParserHelper } from '../../_helpers';


const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        cursor: 'pointer',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
        cursor: 'pointer',
    },
}));

export default withTranslation()(function ({ t, gameName, groupName, groupId }) {
    const classes = useStyles();

    function GroupLink() {
        return <Link
            color="inherit"
            onClick={e => navigation.goToGroupView(groupId)}
            className={classes.link}
        >
            <WhatshotIcon className={classes.icon} />
            {groupName ? groupName : t('GROUP')}
        </Link>
    };
    function GameLink() {
        return <Link
            color="inherit"
            className={classes.link}
        >
            <GrainIcon className={classes.icon} />
            {gameName}
        </Link>
    };

    function ProfileLink() {
        return <Link
            color="inherit"
            className={classes.link}
        >
            <GrainIcon className={classes.icon} />
            {t('PROFILE')}
        </Link>
    };

    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ padding: '12px' }}>

            <Link color="inherit" onClick={navigation.goHome} className={classes.link}>
                <HomeIcon className={classes.icon} />
                {t('HOME')}
            </Link>

            { urlParserHelper.getGroupId() && <GroupLink />}
            { urlParserHelper.getGameId() && <GameLink />}
            { document.URL.includes('profile') && <ProfileLink />}

        </Breadcrumbs >
    );
});



