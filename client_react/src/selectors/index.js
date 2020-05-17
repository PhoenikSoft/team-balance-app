import { store } from '../index';

export default {
    getGroup,
    getGame
}

function getGroup(groupId) {
    const group = store.getState().groups.find(group => group.id == groupId);
    if (group) {
        return group;
    } else {
        return {};
    };
}

function getGame(groupId, gameId) {
    const group = getGroup(groupId);
    if (group) {
        group.games.find(game => game.id == gameId);
    } else {
        return {};
    }
}