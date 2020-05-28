// TODO getGroupId,getGameId to generic func

const getGroupId = () => {
    const splitted = document.URL.split('/')
    const groupsIndex = splitted.findIndex(i => i === 'groups');
    if (groupsIndex > -1) {
        return splitted[groupsIndex + 1];
    }
}

const getGameId = () => {
    const splitted = document.URL.split('/')
    const groupsIndex = splitted.findIndex(i => i === 'games');
    if (groupsIndex > -1) {
        return splitted[groupsIndex + 1];
    }
}

export const urlParserHelper = {
    getGroupId,
    getGameId
}