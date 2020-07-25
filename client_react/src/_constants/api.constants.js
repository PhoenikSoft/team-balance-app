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
    ADD_MEMBER_BATCH: gameId => `/api/userGames/${gameId}/playersBatch`,

    GENERATE_BALANCED_TEAMS: gameId => `/api/userGames/${gameId}/balancedTeams`,

    PLAYER: (gameId, playerId) => `/api/userGames/games/${gameId}/players/${playerId}`,
}

export const routingConstants = {
    ADD_MEMBER_BY_REF: ref => `/addMe/${ref}`
}

export const constructUrl = url => `${config.apiUrl}${url}`;
