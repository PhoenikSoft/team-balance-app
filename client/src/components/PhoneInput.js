import React from 'react';
import { withTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

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

export default withTranslation()(function ({ t, onChange, error, value }) {
    return (
        <TextField
            id="phone"
            label={t('PHONE_NUMBER')}
            type="tel"
            maxLength="12"
            value={value ? value : ''}
            //value="935036714"
            error={error}
            helperText={error && t('PHONE_ERROR')}
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
})
