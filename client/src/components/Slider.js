import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { withTranslation } from 'react-i18next';


export default withTranslation()(function DiscreteSlider({ t, disabled, onChange, value }) {
    const [localValue, setValue] = useState();
    const marks = [
        {
            value: 0,
            label: t('BEGINNER'),
        },
        {
            value: 25,
            label: t('AMATEUR'),
        },
        {
            value: 50,
            label: t('INTERMEDIATE'),
        },
        {
            value: 75,
            label: t('MASTER'),
        },
        {
            value: 100,
            label: t('STAR'),
        }
    ];

    function getValue() {
        return typeof localValue === 'number'
            ? localValue
            : typeof value === 'number' ? value : 50
    }
    return (
        <Slider
            value={getValue()}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            disabled={disabled}
            step={1}
            min={0}
            max={100}
            onChange={(event, nv) => {
                setValue(nv)
            }}
            onChangeCommitted={onChange}
            marks={marks}
        />
    );
});