export interface IProject  {
    active: boolean,
    createTime: string,
    createUser: string,
    envList: TEnv[],
    id: string,
    issues: never[],
    name: string,
    trelloInfo: Record<string, any>,
    slackInfo: Record<string, any>,
    enableSlack: Boolean,
    enableTrello: Boolean,
    userList: TProjectUser[],
    platform: string
}

export type TProjectUser = {
    email: string,
    role: string
}

export type TEnv = 'development' | 'staging' | 'production'

export const API_TYPES = {
    CREATE_PROJECT: 'create-project',
    ADD_MEMBER: 'add-member',
    MODIFY_MEMBER: 'modify-member',
    REMOVE_MEMBER: 'remove-member',
    SET_STATUS: 'set-status'
};