import { memberConstants, apiConstants } from '../_constants';
import { serviceHelper } from '../_helpers';
import { membersService } from '../_services';


const deleteMember = (userId, groupId) => dispatch =>
    membersService.deleteMember(userId, groupId)
        .then(() => dispatch({ type: memberConstants.DELETE_MEMBER, memberId: userId }))
        .catch(serviceHelper.actionsErrorHandler);

const copyLinkToClipBoard = groupRef => {
    const refLink = apiConstants.ADD_MEMBER_BY_REF(groupRef);
    refLink.select().setSelectionRange(0, 99999)
    document.execCommand("copy");
}

export const membersActions = {
    deleteMember,
    copyLinkToClipBoard
};
