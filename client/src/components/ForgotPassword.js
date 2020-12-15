import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

export default withTranslation()(function ForgotPassword({ t, onSubmitClick, error, successMessage }) {
    const classes = useStyles();

    const [inputs, setInputs] = useState({
        email: '',
    });
    const { email } = inputs;

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('FORGOT_PASSWORD_TITLE')}
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => {
                            onSubmitClick(e)(email);
                        }} >
                        {t('REQUEST_FORGOT_PASSWORD')}
                    </Button>
                    {successMessage && <Typography color="primary">{t(successMessage)}{email}</Typography>}
                    {error && <Typography color="error">{t('FORGOT_PASSWORD_FAILED')} {error}</Typography>}
                </form>
            </div>
        </Container>
    );
});