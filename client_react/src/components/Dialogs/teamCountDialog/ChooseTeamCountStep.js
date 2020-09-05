import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default ({ teamsCount, setTeamsCount }) => 
    <FormControl component='fieldset'>
        <RadioGroup value={teamsCount} onChange={e => {
            setTeamsCount(e.target.value)
        }}>
            <FormControlLabel value='2' control={<Radio />} label='2 teams' />
            <FormControlLabel value='3' control={<Radio />} label='3 teams' />
            <FormControlLabel value='4' control={<Radio />} label='4 teams' />
        </RadioGroup>
    </FormControl>
