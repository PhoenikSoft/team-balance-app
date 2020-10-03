import _ from 'lodash';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { connect } from 'react-redux';
import { gamesActions } from '../../../actions';

const mapDispatch = dispatch => {
    return {
        addVote: (userId, vote) => dispatch(gamesActions.addVote(userId, vote))
    }
};

const mapState = state => {
    return {
        votes: state.game.votes,
        submittedVotes: state.game.submittedVotes
    }
};

function VoteDialog({ rating, userId, addVote, votes, submittedVotes }) {
    // bot doesn't have id
    const isBot = userId;
    const voteForThisUser = votes && votes.find(vote => vote.forUserId === userId);
    const submittedVoteForThisUser = submittedVotes && submittedVotes.find(vote => vote.forUserId === userId);
    const getVote = () => {
        if (typeof _.get(voteForThisUser, 'vote') === 'number') {
            return voteForThisUser.vote;
        } else if (typeof _.get(submittedVoteForThisUser, 'vote') === 'number') {
            return submittedVoteForThisUser.vote;
        } else {
            return 0;
        };
    };

    const [vote, setNewVote] = useState(getVote());

    const getMaxOptionToVote = () => {
        const max = rating + 5;
        return max >= 100 ? 100 : max;
    };
    const getMinOptionToVote = () => {
        const min = rating - 5;
        return min <= 0 ? 0 : min;
    };


    return <>
        <Slider
            disabled={!isBot}
            value={rating + vote}
            style={{ color: vote === 0 ? '#3f51b5' : (vote > 0 ? 'green' : 'red') }}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="off"
            step={1}
            marks
            min={getMinOptionToVote()}
            max={getMaxOptionToVote()}
            onChange={(event, value) => {
                setNewVote(value - rating)
            }}
            onChangeCommitted={(event, value) => {
                setNewVote(value - rating)
                addVote(userId, value - rating);
            }}
        />
        <Typography id="discrete-slider" style={{ paddingLeft: '10px' }}>
            {rating + vote}
        </Typography>
    </>
}

export default connect(mapState, mapDispatch)(VoteDialog);