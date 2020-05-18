import { connect } from 'react-redux';
import GamePage from './GamePage';
import { navigation, urlParserHelper } from '../_helpers';
import { groupActions, playersActions, gamesActions } from '../actions';
import selector from '../selectors';

const groupId = urlParserHelper.getGroupId();
const gameId = urlParserHelper.getGameId();

const mapDispatchToProps = dispatch => {
    return {
        // OPTIMIZATION: don't fetch if group is in state already
        fetchGame: () => {
            return dispatch(gamesActions.getGame(groupId, gameId));
        },
        goBack: e => {
            navigation.goToGroupView(groupId);
        },
        addPlayers: players => {
            dispatch(playersActions.addPlayers(groupId, gameId, players));
        },
        deletePlayer: playerId => dispatch(playersActions.deletePlayer(groupId, gameId, playerId))
    }
}

const mapStateToProps = state => {
    return {
        gameFromGlobalState: state.game,
        groupId,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);