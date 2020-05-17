import GroupPage from './GroupPage';
import { connect } from 'react-redux';
import { serviceHelper, navigation, urlParserHelper, } from '../_helpers';
import { groupService } from '../_services'

import { groupActions, membersActions, gamesActions } from '../actions';


const mapDispatchToProps = dispatch => {
    return {
        fetchGroup: async () => {
            const groupId = urlParserHelper.getGroupId()
            return dispatch(groupActions.getGroup(groupId));
        },
        deleteMember: (userId, groupId) => {
            dispatch(membersActions.deleteMember(userId, groupId));
        },
        deleteGame: (gameId, groupId) => {
            dispatch(gamesActions.deleteGame(gameId, groupId));
        },
        copyLink: ref => {
            membersActions.copyLinkToClipBoard(ref);
        },
        addGame: (game, groupId) => {
            dispatch(gamesActions.addGame(game, groupId));
        }
    }
}

const mapStateToProps = state => {
    function getGroup() {
        const groupId = urlParserHelper.getGroupId()
        const group = state.groups.find(group => group.id == groupId);
        if (group) {
            return group;
        } else {
            return {};
        };
    };
    return {
        groupFromGlobalState: getGroup()
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage)