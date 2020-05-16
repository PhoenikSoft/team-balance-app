import { memberConstants, apiConstants } from '../_constants';
import { serviceHelper } from '../_helpers';
import { membersService } from '../_services';


const deleteMember = userId => dispatch =>
    membersService.deleteMember(userId)
        .then(member => dispatch({ type: memberConstants.DELETE_MEMBER, member }))
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
