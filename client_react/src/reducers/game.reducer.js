import _ from 'lodash';
import { gameConstants, playersCosntants } from '../_constants';

export function game(state = { }, action) {
    switch (action.type) {
        case gameConstants.GAME_FETCHED:
            return action.game;
        case playersCosntants.PLAYER_ADDED:
            return { ...state, players: action.newPlayersList }
        case playersCosntants.PLAYER_DELETED:
            return { ...state, players: action.newPlayersList }
        case playersCosntants.TEAM_BALANCED:
            return { ...state, balancedTeams: action.balancedTeams }

        case gameConstants.VOTES_FETCHED:
            return { ...state, submittedVotes: action.votes }
        case gameConstants.VOTES_SUBMITTED:
            return { ...state, submittedVotes: [...action.votes,...state.submittedVotes ]}

        case gameConstants.VOTING_STARTED:
            return { ...state, voteStatus: "STARTED" }
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