import { connect } from 'react-redux';
import VoteDialog from './VoteDialog';
import { gameConstants } from '../../../_constants';

const mapDispatch = dispatch => {
    return {
        addVote: vote => dispatch(gameConstants.VOTE_ADDED, vote),
        flushVotes: () => dispatch(gameConstants.VOTE_FLUSHED)
    }
};

const mapState = state => {
    return {
        votes: state.game.votes
    }
};

export default connect(mapState, mapDispatch)(VoteDialog);