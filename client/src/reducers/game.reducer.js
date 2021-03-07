import _ from 'lodash';
import { gameConstants, playersCosntants } from '../_constants';

export function game(state = {}, action) {
    switch (action.type) {
        case gameConstants.GAME_FETCHED:
            return { ...state, ...parseGame(action.game) };
        case playersCosntants.PLAYER_ADDED:
            return { ...state, players: action.newPlayersList }
        case playersCosntants.PLAYER_DELETED:
            return { ...state, players: action.newPlayersList }
        case playersCosntants.TEAM_BALANCED:
            return { ...state, balancedTeams: action.balancedTeams }


        case gameConstants.BOTS_ADDED:
            return { ...state, bots: action.bots }
        case gameConstants.VOTES_FETCHED:
            return { ...state, submittedVotes: action.votes }
        case gameConstants.VOTES_SUBMITTED:
            return { ...state, submittedVotes: [...action.votes, ...state.submittedVotes] }

        case gameConstants.VOTING_STARTED:
            return { ...state, endVotingTimestamp: action.endVotingTimestamp, voteStatus: "STARTED" }
        case gameConstants.VOTING_FINISHED:
            return { ...state, voteStatus: "FINISHED" }
        case gameConstants.VOTE_ADDED:
            if (state.votes) {
                state.votes.unshift(action.vote)
                return { ...state, votes: _.uniqWith(state.votes, (a, b) => a.forUserId === b.forUserId) }
            } else {
                return { ...state, votes: [action.vote] };
            }

        case gameConstants.FLUSH_VOTES:
            return { ...state, votes: [] }
        default:
            return state
    };
};

function parseGame(fetchedGame) {
    const balancedTeams = fetchedGame.balancedTeams;
    const parsedBots = balancedTeams ? balancedTeams.teams
            .flatMap(team => team.players).filter(player => !player.id)
        : [];
    return {...fetchedGame, bots: parsedBots};
}