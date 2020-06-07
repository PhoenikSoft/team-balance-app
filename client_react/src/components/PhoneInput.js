import React from 'react';
import TextField from '@material-ui/core/TextField';

/// telephone code can be 2 and 3 digits 

export default function ({ onChange, error, value }) {
    return (
        <TextField
            id="phone"
            label="Phone number"
            type="tel"
            maxLength="12"
            value={value ? value : ''}
            error={error ? error : false}
            onChange={onChange}
            variant="outlined"
            inputProps={{
                maxLength: "12",
                // BE validation. this value can also be 10 digits
                minLength: "12"
            }}
        />
    )
}
