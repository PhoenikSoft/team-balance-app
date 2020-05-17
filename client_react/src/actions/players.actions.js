import { playersCosntants } from '../_constants';
import { serviceHelper } from '../_helpers';
import { playersService } from '../_services';

const addPlayers = (groupId, gameId, players) => dispatch =>
    playersService.addPlayersByBatch(groupId, gameId, players)
        .then(newPlayersList => dispatch({ type: playersCosntants.PLAYER_ADDED, newPlayersList }))
        .catch(serviceHelper.actionsErrorHandler);

const deletePlayer = (groupId, gameId, playerId) => dispatch =>
    playersService.deletePlayer(groupId, gameId, playerId)
        .then(newPlayersList => dispatch({ type: playersCosntants.PLAYER_DELETED, newPlayersList }))
        .catch(serviceHelper.actionsErrorHandler);


export const playersActions = {
    addPlayers,
    deletePlayer
};
