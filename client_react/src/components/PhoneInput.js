import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import { userConstants } from '../_constants';


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.formattedValue,
                    },
                });
            }}
            format="+38 (0##) ###-####"
            allowEmptyFormatting
            mask="_"
        />
    );
}

export default function ({ onChange, error, value }) {
    return (
        <TextField
            id="phone"
            label="Phone number"
            type="tel"
            maxLength="12"
            value={value ? value : ''}
            error={error}
            helperText={error && userConstants.PHONE_ERROR}
            onChange={onChange}
            variant="outlined"
            required
            InputProps={{
                inputComponent: NumberFormatCustom,
                maxLength: "12",
                minLength: "12"
            }}
        />
    )
}
