import React from 'react';
import { withTranslation } from 'react-i18next';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default withTranslation()(function ({ t, teamsCount, setTeamsCount }) {

    return <FormControl component='fieldset'>
        <RadioGroup value={teamsCount} onChange={e => {
            setTeamsCount(e.target.value)
        }}>
            <FormControlLabel value='2' control={<Radio />} label={`2 ${t('TEAMS')}`} />
            <FormControlLabel value='3' control={<Radio />} label={`3 ${t('TEAMS')}`} />
            <FormControlLabel value='4' control={<Radio />} label={`4 ${t('TEAMS')}`} />
        </RadioGroup>
    </FormControl>

});