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
import { useLocation } from "react-router-dom";

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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default withTranslation()(function ForgotPassword({ t, onSubmitClick, error }) {
    const classes = useStyles();

    const [inputs, setInputs] = useState({
        password: '',
        confirmPassword: '',
    });
    const { password } = inputs;
    const [errors, setErrors] = useState({
        passwordError: false,
    });
    let query = useQuery();

    function handlePasswordChange(e) {
        const { value, name } = e.target;
        const isPassValid = pass => pass.length >= 8;
        const setPass = () => setInputs(inputs => ({ ...inputs, [name]: value }));
        const setError = flag => setErrors(errors => ({ ...errors, passwordError: flag }));
        const isPasswordsMatch = () => value === inputs.confirmPassword || value === inputs.password;

        if (!value || !isPassValid(value)) {
            setError(true);
            setPass();
            return;
        }

        setError(!isPasswordsMatch());
        setPass();
    }

    function isSubmitDisabled() {
        return Object.values(errors).some(error => error) || Object.values(inputs).some(error => !error);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('RESET_PASSWORD_TITLE')}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        error={errors.passwordError}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('NEW_PASSWORD')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                    />
                    <TextField
                        error={errors.passwordError}
                        helperText={errors.passwordError && t('PASSWORD_ERROR')}
                        variant="outlined"
                        required
                        fullWidth
                        margin="normal"
                        name="confirmPassword"
                        label={t('CONFIRM_NEW_PASSWORD')}
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                    />

                    <Button
                        disabled={isSubmitDisabled()}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => {
                            onSubmitClick(e)(password, query.get('token'));
                        }} >
                        {t('RESET_PASSWORD_BUTTON')}
                    </Button>
                    {error && <Typography color="error">{t('RESET_PASSWORD_FAILED')} {error}</Typography>}
                </form>
            </div>
        </Container>
    );
});