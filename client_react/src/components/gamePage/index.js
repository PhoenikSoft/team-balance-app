import { connect } from 'react-redux';
import GamePage from './GamePage';
import { navigation, urlParserHelper } from '../../_helpers';
import { gamesActions, playersActions } from '../../actions';

const getGroupId = () => urlParserHelper.getGroupId();
const getGameId = () => urlParserHelper.getGameId();

const mapDispatchToProps = dispatch => {
    return {
        // OPTIMIZATION: don't fetch if group is in state already
        fetchGame: () => {
            return dispatch(gamesActions.getGame(getGameId()));
        },
        goBack: () => {
            navigation.goToGroupView(getGroupId());
        },
        addPlayers: players => {
            dispatch(playersActions.addPlayers(getGameId(), players));
        },
        deletePlayer: playerId => dispatch(playersActions.deletePlayer(getGameId(), playerId)),
        balanceTeams: (teamsCount, bots) => dispatch(playersActions.balanceTeams(getGameId(), teamsCount, bots)),
        startVoting: gameId => dispatch(gamesActions.startVoting(gameId)),
        sendVotes: votes => dispatch(gamesActions.sendVotes(getGameId(), votes)),
        getVotes: () => dispatch(gamesActions.getVotes(getGameId())),
    }
}

const mapStateToProps = state => {
    return {
        game: state.game,
        groupId: getGroupId(),
        votes: state.game.submittedVotes
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
