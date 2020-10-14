import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';

export default function DiscreteSlider({ disabled, onChange, value }) {
    const [localValue, setValue] = useState();
    const marks = [
        {
            value: 0,
            label: 'Beginner',
        },
        {
            value: 25,
            label: 'Amateur',
        },
        {
            value: 50,
            label: 'Intermediate',
        },
        {
            value: 75,
            label: 'Master',
        },
        {
            value: 100,
            label: 'Star',
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
}
