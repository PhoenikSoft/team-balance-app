import { memberConstants, routingConstants, groupConstants, userConstants, alertConstants } from '../_constants';
import { serviceHelper, navigation, authHelper } from '../_helpers';
import { membersService } from '../_services';

const deleteMember = (userId, groupId) => dispatch =>
    membersService.deleteMember(userId, groupId)
        .then(() => {
            dispatch({ type: memberConstants.DELETE_MEMBER, memberId: userId });
            if (authHelper.getUserId() == userId) {
                navigation.goHome();
            }
        })
        .catch(serviceHelper.actionsErrorHandler);

const copyLinkToClipBoard = groupRef => {
    const refLink = document.location.origin + routingConstants.ADD_MEMBER_BY_REF(groupRef);
    performCopy(refLink);
};

const addMemberByRef = refLink => dispatch => {
    return membersService.addMemberByRef(refLink)
        // group with new member is returned from server
        .then(group => {
            dispatch({ type: groupConstants.GROUP_FETCHED, groups: [group] });
            navigation.goToGroupView(group.id);
        })
        .catch(error => {
            if (error.includes('User not found for email')) {
                //TODO find a better solution
                setTimeout(() => { dispatch({ type: alertConstants.ALERT_ERROR, text: alertConstants.USER_ALREADY_IN_GROUP }) }, 2000)
                navigation.goHome();
            } else {
                dispatch({ type: userConstants.SAVE_REF_LINK, refLink });
            }
        });
};

function performCopy(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

export const membersActions = {
    deleteMember,
    copyLinkToClipBoard,
    addMemberByRef
};
