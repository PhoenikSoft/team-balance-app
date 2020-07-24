import { gameConstants } from '../_constants';
import { serviceHelper } from '../_helpers';
import { gamesService } from '../_services';


const deleteGame = gameId => dispatch =>
    gamesService.deleteGame(gameId)
        .then(() => dispatch({ type: gameConstants.GAME_DELETED, gameId }))
        .catch(serviceHelper.actionsErrorHandler);

const addGame = (gameId, groupId) => dispatch =>
    gamesService.addGame(gameId, groupId)
        .then(game => dispatch({ type: gameConstants.GAME_ADDED, game }))
        .catch(serviceHelper.actionsErrorHandler);

// TODO add permission denied snackbar when BE is ready
const getGame = gameId => dispatch =>
    gamesService.getGame(gameId)
        .then(game => dispatch({ type: gameConstants.GAME_FETCHED, game }))
        .catch(serviceHelper.actionsErrorHandler);

export const gamesActions = {
    deleteGame,
    addGame,
    getGame
};
