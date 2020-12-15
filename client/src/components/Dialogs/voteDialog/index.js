import { connect } from 'react-redux';
import VoteDialog from './VoteDialog';
import { gameConstants } from '../../../_constants';

const mapDispatch = dispatch => {
    return {
        flushVotes: () => dispatch({ type: gameConstants.FLUSH_VOTES })
    }
};

const mapState = state => {
    return {
        votes: state.game.votes
    }
};

export default connect(mapState, mapDispatch)(VoteDialog);