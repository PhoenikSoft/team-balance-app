export const apiConstants = {
    LOGIN_URL: '/api/auth/login',
    REGISTER_URL: '/api/auth/register',
    GET_USER: '/api/users',

    FEEDBACK_URL: '/api/feedbacks',

    GROUPS: userId => `/api/groups?userId=${userId}`,
    GROUP_ACTION: groupId => `/api/groups/${groupId}`,
    ACCESS_CHECK: groupId => `/api/groups/${groupId}/accessChecks`,

    GAMES: groupId => `api/groups/${groupId}/games`,
    GET_GAME: (groupId, gameId) => `api/groups/${groupId}/games/${gameId}`,

    GENERATE_BALANCED_TEAMS: (groupId, gameId) => `api/groups/${groupId}/games/${gameId}/balancedTeams`,
    GET_PLAYERS: (groupId, gameId) => `api/groups/${groupId}/games/${gameId}/players`,

    PLAYER: (groupId, gameId, playerId) => `api/groups/${groupId}/games/${gameId}/players/${playerId}`,

    PLAYERS_BATCH: (groupId, gameId) => `api/groups/${groupId}/games/${gameId}/playersBatch`

}