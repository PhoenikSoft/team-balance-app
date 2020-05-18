import { gameConstants, playersCosntants } from '../_constants';

export function game(state = {}, action) {
    switch (action.type) {
        case gameConstants.GAME_FETCHED:
            return action.game;
        case playersCosntants.PLAYER_ADDED:
            return { ...state, players: action.newPlayersList }
        case playersCosntants.PLAYER_DELETED:
            return { ...state, players: action.newPlayersList }
        case playersCosntants.TEAM_BALANCED:
            return { ...state, balancedTeams: action.balancedTeams }
        default:
            return state
    };
};