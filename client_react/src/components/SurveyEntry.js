import React, {useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {withTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
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
}));

export default withTranslation()(function SurveyEntry({t, onChange, name, maxValue, question, minLabel, maxLabel}) {
    const classes = useStyles();
    const [answer, setAnswer] = useState('');

    const radios = [];
    const selectOptions = [];
    for (let index = 0; index <= maxValue; index++) {
        radios.push(<FormControlLabel
            key={index}
            value={`${index}`}
            control={<Radio color="primary" inputProps={{'aria-label': index}}/>}
            label={`${index + 1}`}
            labelPlacement="top"
        />);
        selectOptions.push(<MenuItem key={index} value={`${index}`}>{index + 1}</MenuItem>);
    }

    function handleDesktopChange(event, newValue) {
        setAnswer(newValue);
        onChange(event, newValue);
    }

    function handleMobileChange(event) {
        const newValue = event.target.value;
        setAnswer(newValue);
        onChange(event, newValue);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>{question}</Typography>
            </Grid>

            <div className={classes.sectionDesktop}>
                <Grid item xs={2}>
                    {minLabel}
                </Grid>
                <Grid item xs={8}>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label={name} name={name} value={answer} onChange={handleDesktopChange}>
                            {radios}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    {maxLabel}
                </Grid>
            </div>

            <div className={classes.sectionMobile}>
                <Grid item xs={12}>
                    <FormControl>
                        <Select onChange={handleMobileChange} value={answer} displayEmpty>
                            {selectOptions}
                        </Select>
                        <FormHelperText>{t('CHOOSE_YOUR_ANSWER')}</FormHelperText>
                    </FormControl>
                </Grid>
            </div>
        </Grid>
    );
});
