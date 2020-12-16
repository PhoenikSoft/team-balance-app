import { playersCosntants } from '../_constants';
import { serviceHelper } from '../_helpers';
import { playersService } from '../_services';

const addPlayers = (gameId, players) => dispatch =>
    playersService.addPlayersByBatch(gameId, players)
        .then(newPlayersList => dispatch({ type: playersCosntants.PLAYER_ADDED, newPlayersList }))
        .catch(serviceHelper.actionsErrorHandler);

const deletePlayer = (gameId, playerId) => dispatch =>
    playersService.deletePlayer(gameId, playerId)
        .then(newPlayersList => dispatch({ type: playersCosntants.PLAYER_DELETED, newPlayersList }))
        .catch(serviceHelper.actionsErrorHandler);

const balanceTeams = (gameId, teamsCount, bots) => dispatch =>
    playersService.balanceTeams(gameId, teamsCount, bots)
        .then(balancedTeams => dispatch({ type: playersCosntants.TEAM_BALANCED, balancedTeams, gameId }))
        .catch(e => {
            serviceHelper.actionsErrorHandler(e);
            return false;
        });

export const playersActions = {
    addPlayers,
    deletePlayer,
    balanceTeams
};
