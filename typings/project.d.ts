export interface IProject  {
    active: boolean,
    createTime: string,
    createUser: string,
    envList: TEnv[],
    id: string,
    issues: never[],
    name: string,
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