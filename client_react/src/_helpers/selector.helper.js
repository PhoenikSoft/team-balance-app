import { store } from '../index';

export const selectorHelpers = {
    getMembers
}
function getMembers(groupdId) {
    const store = store.getState();
    return store.groups.find(group => group.id === groupdId).members
}