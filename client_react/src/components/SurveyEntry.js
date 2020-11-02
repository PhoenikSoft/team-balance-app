import React from 'react';
import { withTranslation } from 'react-i18next';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

export default withTranslation()(function SurveyEntry({ t, onChange, name, value, question, minLabel, maxLabel, maxValue }) {
    const radios = [];
    for (let index = 1; index <= maxValue; index++) {
        radios.push(<FormControlLabel
            key={index}
            value={`${index}`}
            control={<Radio color="primary" inputProps={{ 'aria-label': index }}/>}
            label={`${index}`}
            labelPlacement="top"
        />);
    }

    return (
        <div>
            <Typography>{question}</Typography>
            <span>{minLabel}</span>
            <FormControl component="fieldset">
                <RadioGroup row aria-label={name} name={name} defaultValue={`${value}`}
                            onChange={onChange}>
                    {radios}
                </RadioGroup>
            </FormControl>
            <span>{maxLabel}</span>
        </div>
    );
});