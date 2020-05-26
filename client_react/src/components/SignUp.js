import React, { useState, useEffect } from 'react';
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
import Slider from './Slider';
import PhoneInput from './PhoneInput';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp({ onRegisterClick, isSignUp, fetchUser, error }) {
    const classes = useStyles();
    const [inputs, setInputs] = useState(getInitialState());

    useEffect(() => {
        if (isSignUp) { return }
        const fetchData = async () => {
            const user = await fetchUser();
            setInputs(user);
        };
        fetchData();
    }, [isSignUp, fetchUser]);

    function getInitialState() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            rating: 50,
            confirmPassword: '',
            password: ''
        };
    }

    const [errors, setErrors] = useState({
        passwordError: false,
        emailError: false,
        phoneError: false,
        lastNameError: false,
        firstNameError: false
    })

    function handleChange(e) {
        const { name, value } = e.target;
        if (!value) {
            setErrors(errors => ({ ...errors, [`${name}Error`]: true }));
            setInputs(inputs => ({ ...inputs, [name]: value }));

        } else {
            setErrors(errors => ({ ...errors, [`${name}Error`]: false }));
            setInputs(inputs => ({ ...inputs, [name]: value }));
        }

    }

    function handleRatingChange(e, newValue) {
        setInputs(inputs => ({ ...inputs, rating: newValue }));
    }

    function handlePhoneChange(newPhone) {

        if (newPhone.length !== 13) {
            setErrors(errors => ({ ...errors, phoneError: true }));
        } else {
            setErrors(errors => ({ ...errors, phoneError: false }));
        };
        setInputs(inputs => ({ ...inputs, phone: newPhone }));
    }

    function handlePasswordChange(e) {
        const { value } = e.target;
        if (!value) {
            setErrors(errors => ({ ...errors, passwordError: true }));
            handleChange(e);
            return;
        };
        if (value === inputs.confirmPassword || value === inputs.password) {
            setErrors(errors => ({ ...errors, passwordError: false }));
        } else {
            setErrors(errors => ({ ...errors, passwordError: true }));
        };
        handleChange(e);
    }

    function handleEmailChange(e) {

        const { value } = e.target;
        const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(emailRegex)) {
            setInputs(inputs => ({ ...inputs, email: value }));
            setErrors(errors => ({ ...errors, emailError: false }));
        } else {
            setInputs(inputs => ({ ...inputs, email: value }));
            setErrors(errors => ({ ...errors, emailError: true }));
        }
    }

    function isSubmitDisabled() {
        return Object.values(errors).some(error => error) || Object.values(inputs).some(error => !error)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {isSignUp && <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>}
                <Typography component="h1" variant="h5">
                    {isSignUp ? 'Sign up' : 'Profile'}
                </Typography>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                value={inputs.firstName}
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleChange}
                                error={errors.firstNameError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={inputs.lastName}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleChange}
                                error={errors.lastNameError}
                            />
                        </Grid>
                        {isSignUp && <Grid item xs={12}>
                            <TextField
                                value={inputs.email}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleEmailChange}
                                error={inputs.emailError}
                            />
                        </Grid>}
                        <Grid item xs={12}>
                            <PhoneInput
                                error={errors.phoneError}
                                onChange={handlePhoneChange}
                                value={inputs.phone}
                            />
                        </Grid>
                        {isSignUp && <>
                            <Grid item xs={12}>
                                <TextField
                                    error={errors.passwordError}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={errors.passwordError}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    onChange={handlePasswordChange}
                                />
                            </Grid> </>}
                        <Grid item xs={12}>
                            <Typography>Rating</Typography>
                            <Slider
                                name="rating"
                                onChange={handleRatingChange}
                                value={inputs.rating}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={isSubmitDisabled()}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => {
                            onRegisterClick(e)(inputs);
                        }}>
                        {isSignUp ? 'Sign Up' : 'Update'}
                    </Button>

                    {isSignUp && <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>}
                    {error && <Typography color="error">{error}</Typography>}

                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    );
}