import {alertConstants, gameConstants} from '../_constants';
import {serviceHelper} from '../_helpers';
import {gamesService} from '../_services';

const deleteGame = gameId => dispatch =>
    gamesService.deleteGame(gameId)
        .then(() => dispatch({type: gameConstants.GAME_DELETED, gameId}))
        .catch(serviceHelper.actionsErrorHandler);

const addGame = (gameId, groupId) => dispatch =>
    gamesService.addGame(gameId, groupId)
        .then(game => dispatch({type: gameConstants.GAME_ADDED, game}))
        .catch(serviceHelper.actionsErrorHandler);

// TODO add permission denied snackbar when BE is ready
const getGame = gameId => dispatch =>
    gamesService.getGame(gameId)
        .then(game => dispatch({type: gameConstants.GAME_FETCHED, game}))
        .catch(serviceHelper.actionsErrorHandler);

const getVotes = gameId => dispatch =>
    gamesService.getVotes(gameId)
        .then(votes => dispatch({type: gameConstants.VOTES_FETCHED, votes}))
        .catch(serviceHelper.actionsErrorHandler);

const sendVotes = (gameId, votes) => dispatch =>
    gamesService.sendVotes(gameId, votes)
        .then(() => dispatch({type: gameConstants.VOTES_SUBMITTED, votes}))
        .catch(e => {
            dispatch(getVotes(gameId));
            serviceHelper.actionsErrorHandler(e);
        });

const startVoting = gameId => dispatch =>
    gamesService.startVoting(gameId)
        .then(() => {
            dispatch({type: gameConstants.VOTING_STARTED})
            dispatch({type: alertConstants.ALERT_SUCCESS, text: alertConstants.VOTING_STARTED})
        })
        .catch(serviceHelper.actionsErrorHandler);

const addVote = (userId, voteValue) => dispatch => {
    const vote = {forUserId: userId, vote: voteValue};
    dispatch({type: gameConstants.VOTE_ADDED, vote})
}

const flushVotes = () => dispatch => {
    dispatch({type: gameConstants.FLUSH_VOTES})
}

export const gamesActions = {
    deleteGame,
    addGame,
    getGame,
    getVotes,
    sendVotes,
    startVoting,
    addVote,
    flushVotes
};
