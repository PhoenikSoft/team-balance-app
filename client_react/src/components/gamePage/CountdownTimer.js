import React, { useState } from 'react';
import moment from 'moment';

export default function ({ deadline }) {
    const isTimerExpired = total => total > 0;
    const [timer, setTimer] = useState(getTimeRemaining(deadline));

    setTimeout(() => {
        const timer = getTimeRemaining(deadline);
        isTimerExpired(timer.total) && setTimer(timer);
    }, 1000);

    return isTimerExpired(timer.total)
        ? (<div>
            {`${timer.hours} hours `} 
            {`${timer.minutes} minutes `}
            {`${timer.seconds} seconds `}
        </div>)
        : <div>Voting is closed</div>
};



function getTimeRemaining(deadline) {
    const localOffset = new Date().getTimezoneOffset();
    const total = moment(deadline)
        .subtract(localOffset, 'minutes')
        .diff(moment(), 'milliseconds');
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)));
    ///const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        //days,
        hours,
        minutes,
        seconds
    };
};