import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import SurveyEntry from './SurveyEntry';
import Grid from '@material-ui/core/Grid';
import { ratingService } from '../_services';

function getInitialState() {
    return {
        firstAnswer: null,
        secondAnswer: null,
        thirdAnswer: null,
        fourthAnswer: null,
        fifthAnswer: null,
    };
}

export default withTranslation()(function RatingSurvey({ t, onChange }) {
    const [inputs, setInputs] = useState(getInitialState());

    function getAnswerChangedHandler(fieldName) {
        return (e, newValue) => {
            setInputs(inputs => {
                inputs[fieldName] = newValue;
                return inputs;
            });
            if (allQuestionsAreAnswered()) {
                const fetchRating = async () => {
                    const ratingObj = await ratingService.calculateRating(inputs);
                    onChange(ratingObj.rating);
                };
                fetchRating();
            }
        };
    }

    function allQuestionsAreAnswered() {
        return Object.values(inputs).every(answer => answer);
    }

    return (
        <div>
            <Typography>Rating Survey</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="question1"
                        question="Test question 1"
                        minLabel="Test min 1"
                        maxLabel="Test max 1"
                        maxValue="5"
                        onChange={getAnswerChangedHandler('firstAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="question2"
                        question="Test question 2"
                        minLabel="Test min 2"
                        maxLabel="Test max 2"
                        maxValue="5"
                        onChange={getAnswerChangedHandler('secondAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="question3"
                        question="Test question 3"
                        minLabel="Test min 3"
                        maxLabel="Test max 3"
                        maxValue="5"
                        onChange={getAnswerChangedHandler('thirdAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="question4"
                        question="Test question 4"
                        minLabel="Test min 4"
                        maxLabel="Test max 4"
                        maxValue="5"
                        onChange={getAnswerChangedHandler('fourthAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="question5"
                        question="Test question 5"
                        minLabel="Test min 5"
                        maxLabel="Test max 5"
                        maxValue="5"
                        onChange={getAnswerChangedHandler('fifthAnswer')}
                    />
                </Grid>
            </Grid>
        </div>
    );
});