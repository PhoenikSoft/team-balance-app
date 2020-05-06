import React from 'react';
import MuiPhoneNumber from "material-ui-phone-number"


export default function ({ onChange, error }) {
    return (
        <MuiPhoneNumber
            error={error}
            variant="outlined"
            required
            fullWidth
            id="phone"
            label="Phone number"
            autoComplete="phone"
            defaultCountry={'ua'}
            disableDropdown={true}
            name="phone"
            autoFormat={false}
            onChange={onChange}
        />
    )
}
