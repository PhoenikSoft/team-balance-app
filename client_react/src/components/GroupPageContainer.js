import GroupPage from './GroupPage';
import { connect } from 'react-redux';
import { navigation, urlParserHelper } from '../_helpers';

import { groupActions, membersActions, gamesActions } from '../actions';
import selector from '../selectors';


const mapDispatchToProps = dispatch => {
    return {
        // OPTIMIZATION: don't fetch if group is in state already
        fetchGroup: () => {
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
        },

    }
}

const mapStateToProps = state => {
    const groupFromGlobalState = selector.getGroup(urlParserHelper.getGroupId());
    return {
        groupFromGlobalState,
        onGameRowClick: (e, game) => {
            navigation.goToGameView(groupFromGlobalState.id, game.id);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage)