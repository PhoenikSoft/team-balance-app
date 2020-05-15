import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const navigation = {
    goToGroupView
}

function goToGroupView(groupId) {
    history.push(`/home/groups/${groupId}`);
};