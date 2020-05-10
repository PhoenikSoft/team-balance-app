import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';

export default function DiscreteSlider({ onChange, value }) {
    const [localValue, setValue] = useState()
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
            step={1}
            min={0}
            max={100}
            onChange={(event, nv) => {
                setValue(nv)
            }}
            onChangeCommitted={onChange}
        />
    );
}
