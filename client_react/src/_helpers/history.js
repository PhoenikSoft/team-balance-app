import { createBrowserHistory } from 'history';
import { apiConstants } from '../_constants';


export const history = createBrowserHistory();


export const navigation = {
    goToGroupView,
    goToProfile,
    goHome,
    goToRefLink,
    goToGameView
}

function goToGroupView(groupId) {
    history.push(`/home/groups/${groupId}`);
};

function goToProfile() {
    history.push('/home/profile');
}

function goHome() {
    history.push('/home');
}

function goToRefLink(ref) {
    history.push(apiConstants.ADD_MEMBER_BY_REF(ref));
}

function goToGameView(groupId, gameId) {
    history.push(`/home/groups/${groupId}/games/${gameId}`);
}