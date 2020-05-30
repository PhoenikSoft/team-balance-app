import config from '../config';

export const apiConstants = {
    LOGIN_URL: '/api/auth/login',
    REGISTER_URL: '/api/auth/register',
    GET_USER: '/api/users',

    FEEDBACK_URL: '/api/feedbacks',

    GROUPS: userId => `/api/groups?userId=${userId}`,
    GROUP_ACTION: groupId => `/api/groups/${groupId}`,
    ACCESS_CHECK: groupId => `/api/groups/${groupId}/accessChecks`,

    GET_MEMBERS: groupId => `/api/groups/${groupId}/members`,
    MEMBER: (groupId, memberId) => `/api/groups/${groupId}/members/${memberId}`,
    ADD_MEMBER_BY_REF: ref => `/api/groups/refs/${ref}/members`,
    ADD_MEMBER_BATCH: (groupId, gameId) => `/api/groups/${groupId}/games/${gameId}/playersBatch`,

    GAMES: groupId => `/api/groups/${groupId}/games`,
    GAME: (groupId, gameId) => `/api/groups/${groupId}/games/${gameId}`,

    GENERATE_BALANCED_TEAMS: (groupId, gameId) => `/api/groups/${groupId}/games/${gameId}/balancedTeams`,
    GET_PLAYERS: (groupId, gameId) => `/api/groups/${groupId}/games/${gameId}/players`,

    PLAYER: (groupId, gameId, playerId) => `/api/groups/${groupId}/games/${gameId}/players/${playerId}`,

    PLAYERS_BATCH: (groupId, gameId) => `/api/groups/${groupId}/games/${gameId}/playersBatch`,
}

export const routingConstants = {
    ADD_MEMBER_BY_REF: ref => `/addMe/${ref}`
}

export const constructUrl = url => `${config.apiUrl}${url}`;