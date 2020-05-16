import { memberConstants, apiConstants } from '../_constants';
import { serviceHelper } from '../_helpers';
import { membersService } from '../_services';
import config from '../config';


const deleteMember = (userId, groupId) => dispatch =>
    membersService.deleteMember(userId, groupId)
        .then(() => dispatch({ type: memberConstants.DELETE_MEMBER, memberId: userId }))
        .catch(serviceHelper.actionsErrorHandler);

const copyLinkToClipBoard = groupRef => {
    const refLink = config.apiUrl + apiConstants.ADD_MEMBER_BY_REF(groupRef);
    performCopy(refLink);
}

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
    copyLinkToClipBoard
};
