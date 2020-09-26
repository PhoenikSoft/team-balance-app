import config from '../config';

export const apiConstants = {
    LOGIN_URL: '/api/auth/login',
    REGISTER_URL: '/api/auth/register',
    GET_USER: '/api/users',

    FEEDBACK_URL: '/api/feedbacks',

    GROUPS: () => '/api/userGroups',
    GROUP_ACTION: groupId => `/api/userGroups/${groupId}`,
    ACCESS_CHECK: groupId => `/api/userGroups/${groupId}/accessChecks`,

    GET_MEMBERS: groupId => `/api/userGroups/${groupId}/members`,
    MEMBER: (groupId, memberId) => `/api/userGroups/${groupId}/members/${memberId}`,
    ADD_MEMBER_BY_REF: ref => `/api/userGroups/refs/${ref}/members`,
    GAMES: groupId => `/api/userGroups/${groupId}/games`,

    GAME: gameId => `/api/userGames/${gameId}`,
    GAME_VIEW: gameId => `/api/userGames/${gameId}/views`,
    ADD_MEMBER_BATCH: gameId => `/api/userGames/${gameId}/playersBatch`,

    GENERATE_BALANCED_TEAMS: (gameId, teamsCount) => `/api/userGames/${gameId}/balancedTeams?teamsCount=${teamsCount}`,

    GET_PLAYERS: gameId => `/api/userGames/${gameId}/players`,
    PLAYER: (gameId, playerId) => `/api/userGames/${gameId}/players/${playerId}`,
    MY_VOTES: gameId => `/api/userGames/${gameId}/votes`,
    POST_MY_VOTES_BATCH: gameId => `/api/userGames/${gameId}/votesBatches`,
    START_VOTING: gameId => `/api/userGames/${gameId}/votingStarts`,
}

export const routingConstants = {
    ADD_MEMBER_BY_REF: ref => `/addMe/${ref}`,
}

export const constructUrl = url => `${config.apiUrl}${url}`;
