import React from 'react';
import Slider from '@material-ui/core/Slider';

export default function DiscreteSlider({ onChange }) {
    return (
        <Slider
            defaultValue={50}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={100}
            onChange={onChange}
        />
        // </div>
    );
}
