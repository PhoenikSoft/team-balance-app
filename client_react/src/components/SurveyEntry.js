import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function SurveyEntry({ onChange, name, value, question, minLabel, maxLabel, maxValue }) {
    const radios = [];
    for (let index = 0; index <= maxValue; index++) {
        radios.push(<FormControlLabel
            key={index}
            value={`${index}`}
            control={<Radio color="primary" inputProps={{ 'aria-label': index }}/>}
            label={`${index + 1}`}
            labelPlacement="top"
        />);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>{question}</Typography>
            </Grid>
            <Grid item xs={2}>
                {minLabel}
            </Grid>

            <Grid item xs={8}>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label={name} name={name} defaultValue={`${value}`}
                                onChange={onChange}>
                        {radios}
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                {maxLabel}
            </Grid>
        </Grid>
    );
}