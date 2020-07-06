import React, { useState } from 'react';
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
        votes: state.game.votes
    }
};

function VoteDialog({ rating, userId, addVote, votes }) {
    const voteForThisUser = votes && votes.find(vote => vote.forUserId === userId);
    const [newRating, setNewRating] = useState((voteForThisUser && voteForThisUser.vote) || rating);

    return <>
        <Slider
            value={newRating || (voteForThisUser && voteForThisUser.vote) || rating}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="off"
            step={1}
            marks
            min={rating - 5}
            max={rating + 5}
            onChange={(event, nv) => {
                setNewRating(nv)
            }}
            onChangeCommitted={() => {
                setNewRating(newRating);
                addVote(userId, newRating);
            }}
        />
        <Typography id="discrete-slider" style={{ paddingLeft: '10px' }}>
            {newRating}
        </Typography>
    </>
}

export default connect(mapState, mapDispatch)(VoteDialog);