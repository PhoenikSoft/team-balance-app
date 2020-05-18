import { connect } from 'react-redux';
import GamePage from './GamePage';
import { navigation, urlParserHelper } from '../_helpers';
import { groupActions, playersActions, gamesActions } from '../actions';

const getGroupId = () => urlParserHelper.getGroupId();
const getGameId = () => urlParserHelper.getGameId();

const mapDispatchToProps = dispatch => {
    return {
        // OPTIMIZATION: don't fetch if group is in state already
        fetchGame: () => {
            return dispatch(gamesActions.getGame(getGroupId(), getGameId()));
        },
        goBack: e => {
            navigation.goToGroupView(getGroupId());
        },
        addPlayers: players => {
            dispatch(playersActions.addPlayers(getGroupId(), getGameId(), players));
        },
        deletePlayer: playerId => dispatch(playersActions.deletePlayer(getGroupId(), getGameId(), playerId)),
        balanceTeams: () => dispatch(playersActions.balanceTeams(getGameId(), getGroupId()))
    }
}

const mapStateToProps = state => {
    return {
        gameFromGlobalState: state.game,
        groupId: getGroupId(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);