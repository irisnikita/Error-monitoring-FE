import {TEnv} from 'typings/project';

export const API_TYPES = {
    CREATE_PROJECT: 'create-project',
    ADD_MEMBER: 'add-member',
    MODIFY_MEMBER: 'modify-member',
    REMOVE_MEMBER: 'remove-member',
    SET_STATUS: 'set-status'
};

// Role
export const OWNER = 'owner';
export const OWNER_LABEL = 'Owner';
export const OWNER_COLOR = 'purple';
export const OWNER_PRIORITY = 4;

export const ADMIN = 'admin';
export const ADMIN_LABEL = 'Admin';
export const ADMIN_COLOR = 'gold';
export const ADMIN_PRIORITY = 3;

export const EDITOR = 'editor';
export const EDITOR_LABEL = 'Editor';
export const EDITOR_COLOR = 'cyan';
export const EDITOR_PRIORITY = 2;

export const VIEWER = 'viewer';
export const VIEWER_LABEL = 'Viewer';
export const VIEWER_COLOR = 'magenta';
export const VIEWER_PRIORITY = 1;

// Env
export const DEVELOPMENT = 'development';
export const DEVELOPMENT_LABEL = 'Development';

export const STAGING = 'staging';
export const STAGING_LABEL = 'Staging';

export const PRODUCTION = 'production';
export const PRODUCTION_LABEL = 'Production';

export const envList: TEnv[] = ['development', 'staging', 'production'];

export const initialProject = {
    active: true,
    createTime: '',
    createUser: '',
    envList: envList,
    id: '',
    issues: [],
    name: '',
    platform: '',
    userList: []
}; 

export const ENV_LIST = [
    {key: DEVELOPMENT, label: DEVELOPMENT_LABEL},
    {key: STAGING, label: STAGING_LABEL},
    {key: PRODUCTION, label: PRODUCTION_LABEL}
];

export const ROLE_LIST = [
    {key: OWNER, label: OWNER_LABEL, color: OWNER_COLOR, priority: OWNER_PRIORITY},
    {key: ADMIN, label: ADMIN_LABEL, color: ADMIN_COLOR, priority: ADMIN_PRIORITY},
    {key: VIEWER, label: VIEWER_LABEL, color: VIEWER_COLOR, priority: VIEWER_PRIORITY},
    {key: EDITOR, label: EDITOR_LABEL, color: EDITOR_COLOR, priority: EDITOR_PRIORITY}
];