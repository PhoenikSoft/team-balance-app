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

const balanceTeams = (gameId, groupId, ) => dispatch =>
    playersService.balanceTeams(gameId, groupId)
        .then(balancedTeams => dispatch({ type: playersCosntants.TEAM_BALANCED, balancedTeams, gameId }))
        .catch(e => {
            if (e === `Argument 'players' is not valid`) {
                serviceHelper.actionsErrorHandler('Make sure game contains more than 3 players');
            } else {
                serviceHelper.actionsErrorHandler();
            }
        });

export const playersActions = {
    addPlayers,
    deletePlayer,
    balanceTeams
};
