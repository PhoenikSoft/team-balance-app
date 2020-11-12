import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import SurveyEntry from './SurveyEntry';
import Grid from '@material-ui/core/Grid';
import { ratingService } from '../_services';

function getInitialState() {
    return {
        techniqueAnswer: { maxValue: 6 },
        speedAnswer: { maxValue: 6 },
        fieldVisionAnswer: { maxValue: 6 },
        enduranceAnswer: { maxValue: 6 },
        passAnswer: { maxValue: 6 },
        hitAnswer: { maxValue: 6 },
        stealingAnswer: { maxValue: 6 },
        goalkeepingAnswer: { maxValue: 6 },
    };
}

export default withTranslation()(function RatingSurvey({ t, onChange }) {
    const [inputs, setInputs] = useState(getInitialState());

    function getAnswerChangedHandler(fieldName) {
        return (e, newValue) => {
            setInputs(inputs => {
                inputs[fieldName].answer = newValue;
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
        return Object.values(inputs).every(answer => answer.answer);
    }

    return (
        <div>
            <Typography>{t('RATING_SURVEY_TITLE')}</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="techniqueQuestion"
                        question={t('RATING_SURVEY_TECHNIQUE_QUESTION')}
                        minLabel={t('RATING_SURVEY_TECHNIQUE_QUESTION_MIN')}
                        maxLabel={t('RATING_SURVEY_TECHNIQUE_QUESTION_MAX')}
                        maxValue={inputs.techniqueAnswer.maxValue}
                        onChange={getAnswerChangedHandler('techniqueAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="speedQuestion"
                        question={t('RATING_SURVEY_SPEED_QUESTION')}
                        minLabel={t('RATING_SURVEY_SPEED_QUESTION_MIN')}
                        maxLabel={t('RATING_SURVEY_SPEED_QUESTION_MAX')}
                        maxValue={inputs.speedAnswer.maxValue}
                        onChange={getAnswerChangedHandler('speedAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="fieldVisionQuestion"
                        question={t('RATING_SURVEY_VISION_QUESTION')}
                        minLabel={t('RATING_SURVEY_VISION_QUESTION_MIN')}
                        maxLabel={t('RATING_SURVEY_VISION_QUESTION_MAX')}
                        maxValue={inputs.fieldVisionAnswer.maxValue}
                        onChange={getAnswerChangedHandler('fieldVisionAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="enduranceQuestion"
                        question={t('RATING_SURVEY_ENDURANCE_QUESTION')}
                        minLabel={t('RATING_SURVEY_ENDURANCE_QUESTION_MIN')}
                        maxLabel={t('RATING_SURVEY_ENDURANCE_QUESTION_MAX')}
                        maxValue={inputs.enduranceAnswer.maxValue}
                        onChange={getAnswerChangedHandler('enduranceAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="passQuestion"
                        question={t('RATING_SURVEY_PASS_QUESTION')}
                        minLabel={t('RATING_SURVEY_PASS_QUESTION_MIN')}
                        maxLabel={t('RATING_SURVEY_PASS_QUESTION_MAX')}
                        maxValue={inputs.passAnswer.maxValue}
                        onChange={getAnswerChangedHandler('passAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="hitQuestion"
                        question={t('RATING_SURVEY_HIT_QUESTION')}
                        minLabel={t('RATING_SURVEY_HIT_QUESTION_MIN')}
                        maxLabel={t('RATING_SURVEY_HIT_QUESTION_MAX')}
                        maxValue={inputs.hitAnswer.maxValue}
                        onChange={getAnswerChangedHandler('hitAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="stealingQuestion"
                        question={t('RATING_SURVEY_STEALING_QUESTION')}
                        minLabel={t('RATING_SURVEY_STEALING_QUESTION_MIN')}
                        maxLabel={t('RATING_SURVEY_STEALING_QUESTION_MAX')}
                        maxValue={inputs.stealingAnswer.maxValue}
                        onChange={getAnswerChangedHandler('stealingAnswer')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SurveyEntry
                        name="goalkeepingQuestion"
                        question={t('RATING_SURVEY_GOALKEEPING_QUESTION')}
                        minLabel={t('RATING_SURVEY_GOALKEEPING_QUESTION_MIN')}
                        maxLabel={t('RATING_SURVEY_GOALKEEPING_QUESTION_MAX')}
                        maxValue={inputs.goalkeepingAnswer.maxValue}
                        onChange={getAnswerChangedHandler('goalkeepingAnswer')}
                    />
                </Grid>
            </Grid>
        </div>
    );
});