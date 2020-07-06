import { connect } from 'react-redux';
import GamePage from './GamePage';
import { navigation, urlParserHelper } from '../../_helpers';
import { playersActions, gamesActions } from '../../actions';

const getGroupId = () => urlParserHelper.getGroupId();
const getGameId = () => urlParserHelper.getGameId();

const mapDispatchToProps = dispatch => {
    return {
        // OPTIMIZATION: don't fetch if group is in state already
        fetchGame: () => {
            return dispatch(gamesActions.getGame(getGroupId(), getGameId()));
        },
        goBack: () => {
            navigation.goToGroupView(getGroupId());
        },
        addPlayers: players => {
            dispatch(playersActions.addPlayers(getGroupId(), getGameId(), players));
        },
        deletePlayer: playerId => dispatch(playersActions.deletePlayer(getGroupId(), getGameId(), playerId)),
        balanceTeams: () => dispatch(playersActions.balanceTeams(getGameId(), getGroupId())),
        startVoting: (groupId, gameId) => dispatch(gamesActions.startVoting(groupId, gameId)),
        sendVotes: votes => dispatch(gamesActions.sendVotes(getGameId(), votes)),
        getVotes: () => dispatch(gamesActions.getVotes(getGameId()))
    }
}

const mapStateToProps = state => {
    return {
        game: state.game,
        groupId: getGroupId(),
        votes: state.game.votes
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);