import { store } from '../index';

export const selectorHelpers = {
    getMembers
}

function getMembers(groupdId) {
    const storeState = store.getState();
    return storeState.groups.find(group => group.id === groupdId).members;
}