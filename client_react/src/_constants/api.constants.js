export const apiConstants = {
    LOGIN_URL: '/api/auth/login',
    REGISTER_URL: '/api/auth/register',
    GET_USER: '/api/users',

    FEEDBACK_URL: '/api/feedbacks',

    GROUPS: '/api/groups',
    GROUP_ACTION: groupId => `/api/groups/${groupId}`,
    ACCESS_CHECK: groupId => `/api/groups/${groupId}/accessChecks`

}