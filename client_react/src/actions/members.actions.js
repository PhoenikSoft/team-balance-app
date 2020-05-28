import { memberConstants, apiConstants, groupConstants, userConstants } from '../_constants';
import { serviceHelper, history, navigation } from '../_helpers';
import { membersService } from '../_services';
import config from '../config';


const deleteMember = (userId, groupId) => dispatch =>
    membersService.deleteMember(userId, groupId)
        .then(() => dispatch({ type: memberConstants.DELETE_MEMBER, memberId: userId }))
        .catch(serviceHelper.actionsErrorHandler);

const copyLinkToClipBoard = groupRef => {
    const refLink = document.location.origin + apiConstants.ADD_MEMBER_BY_REF(groupRef);
    performCopy(refLink);
}

const addMemberByRef = refLink => dispatch => {
    return membersService.addMemberByRef(refLink)
        // group with new member is returned from server
        .then(group => {
            dispatch({ type: groupConstants.GROUP_FETCHED, groups: [group] });
            navigation.goToGroupView(group.id);
            return true;
        })
        .catch(error => {
            dispatch({ type: userConstants.SAVE_REF_LINK, refLink });
            return false;
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
