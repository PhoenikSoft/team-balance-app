import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { withTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'contents',
        },
    },
    sectionMobile: {
        display: 'contents',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

export default withTranslation()(function SurveyEntry({ t, onChange, name, maxValue, question, minLabel, maxLabel }) {
    const classes = useStyles();
    const [answer, setAnswer] = useState('');

    function getSelectOptionLabelByIndex(index) {
        let label = `${index + 1}`;
        if (index === 0) {
            label = label.concat(` - ${minLabel}`);
        } else if (index === maxValue) {
            label = label.concat(` - ${maxLabel}`);
        }
        return label;
    }

    function createSurveyOptions() {
        const radios = [];
        const selectOptions = [];
        for (let index = 0; index <= maxValue; index++) {
            radios.push(<FormControlLabel
                key={index}
                value={`${index}`}
                control={<Radio color="primary" inputProps={{ 'aria-label': index }} />}
                label={`${index + 1}`}
                labelPlacement="top"
            />);

            const optionLabel = getSelectOptionLabelByIndex(index);
            selectOptions.push(<MenuItem key={index} value={`${index}`} style={{ whiteSpace: 'pre-wrap' }}>{optionLabel}</MenuItem>);
        }

        return [radios, selectOptions];
    }

    const [radios, selectOptions] = createSurveyOptions();

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
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h5" style={{ display: 'flex', justifyContent: 'center' }}>{question}</Typography>
            </Grid>

            <div className={classes.sectionDesktop}>
                <Grid item xs>
                    <Typography>{minLabel}</Typography>
                </Grid>
                <Grid item xs={5}>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label={name} name={name} value={answer} onChange={handleDesktopChange}>
                            {radios}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    <Typography>{maxLabel}</Typography>
                </Grid>
            </div>

            <div className={classes.sectionMobile}>
                <Grid item xs style={{ display: 'flex', justifyContent: 'center', maxWidth: '100vw' }}>
                    <FormControl style={{ maxWidth: '70%' }}>
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
