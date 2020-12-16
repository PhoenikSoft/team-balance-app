import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { history } from '../_helpers';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default withTranslation()(function SignIn({ t, onLoginClick, message, error, refLink }) {
    const classes = useStyles();

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const { email, password } = inputs;

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('SIGN_IN')}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        name="email"
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('EMAIL_ADDRESS')}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        name="password"
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label={t('PASSWORD')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        /> */}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => {
                            onLoginClick(e)(email, password);
                            //onLoginClick(e)('dev@dev.com', 'dev');
                        }} >
                        {t('SIGN_IN')}
                    </Button>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Link href="#" variant="body2" onClick={() => history.push('/register')}>
                                {t('SIGN_UP_QUESTION')}
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="#" variant="body2" onClick={() => history.push('/forgot-password')}>
                                {t('FORGOT_PASSWORD_QUESTION')}
                            </Link>
                        </Grid>
                        {refLink && <Grid item xs={12}>
                            <Typography color="secondary">
                                {t('LINK_REGISTER_QUESTION')}
                            </Typography>
                        </Grid>}
                    </Grid>
                    {message && <Typography color="primary">{t(message)}</Typography>}
                    {error && <Typography color="error">{t('LOGIN_FAILED')} {error}</Typography>}
                </form>
            </div>
            <Box mt={8}>

            </Box>
        </Container>
    );
});