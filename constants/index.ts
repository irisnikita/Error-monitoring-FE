export const appConfig = {
    GOOGLE_CLIENT_ID: ''
};

export const userTypeApi = {
    REGISTER: 'register',
    LOGIN: 'login',
    UPDATE: 'update',
    AUTHENTICATION: 'get-user',
    UPDATE_PASSWORD: 'update-password'
};

export const platforms = [
    {key: 'react-js', label: 'ReactJs', logo: '/images/platform/reactjs.svg'},
    {key: 'javascript', label: 'JavaScript', logo: '/images/platform/javascript.svg'},
    {key: 'react-native', label: 'ReactNative', logo: '/images/platform/react-native-logo-259x300.png'},
    {key: 'nodejs', label: 'NodeJs', logo: '/images/platform/nodejs.svg'}
];

export const projectStatus = [
    {key: 'active', label: 'Active', value: true},
    {key: 'in-active', label: 'Inactive', value: false}
];

export const dateFormat = 'DD-MM-YYYY';

export const envList = ['development', 'staging', 'production'];