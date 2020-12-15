import { createBrowserHistory } from 'history';
import { routingConstants } from '../_constants';


export const history = createBrowserHistory();


export const navigation = {
    goToGroupView,
    goToProfile,
    goHome,
    goToRefLink,
    goToGameView,
    goBack,
    goToLogin
}

function goBack() {
    history.goBack();
}

function goToGroupView(groupId) {
    history.push(`/home/groups/${groupId}`);
}

function goToProfile() {
    history.push('/home/profile');
}

function goHome() {
    history.push('/home');
}

function goToLogin() {
    history.push('/login');
}

function goToRefLink(ref) {
    history.push(routingConstants.ADD_MEMBER_BY_REF(ref));
}

function goToGameView(groupId, gameId) {
    history.push(`/home/groups/${groupId}/games/${gameId}`);
}