import axios from 'axios';

const instance = axios.create();

var CancelToken = axios.CancelToken;

instance.interceptors.request.use( (config: any) => {
    if ((process as any).browser) {
        let token = localStorage.getItem('token');

        if (token) {
            config.params = {
                ...config.params,
                token: token || ''
            };
        }

        // config.timeout = 20000;
        
        return config;
    }
});

export const services =  {
    get: function get(params: any) {
        if (typeof params.API !== 'undefined') {
            let API = params.API;

            if (params.id) {
                API = API + `/${params.id}`;
            }
            const cancelToken = params.cancelToken ? params.cancelToken : new CancelToken(function () {});

            delete params.API;
            delete params.cancelToken;

            return instance.get(API, {
                params: params,
                cancelToken: cancelToken
            });
        } else {
            return false;
        }
    },
    getList: function getList(params: any) {
        if (params) {
            if (typeof(params.API) !== undefined) {
                const API = params.API;
                const cancelToken = params.cancelToken ? params.cancelToken : new CancelToken(function () {});
    
                delete params.API;
                delete params.cancelToken;
    
                return instance.get(API, {
                    params: params,
                    cancelToken
                });
            } else {return false}
        }
    },
    create: function create(params: any) {
        if (typeof(params.API) !== undefined) {
            const API = params.API;

            delete params.API;

            return instance.post(API, params);

        } else {
            return false;
        }
    },
    upload: function create(params: any) {
        if (typeof(params.API) !== undefined) {
            const API = params.API;

            delete params.API;

            return instance.post(API, params.formData, {params: {key: params.key}});

        } else {
            return false;
        }
    },
    del: function del(params: any) {
        if (typeof params.API !== 'undefined') {
            const API = params.API;

            delete params.API;

            return instance.delete(API + '/' + params.id, {
                params: params
            });
        } else {
            return false;
        }
    },
    update: function update(params: any) {
        if (typeof params.API !== 'undefined') {
            let API = params.API;

            if (params.id) {
                API = API + `/${params.id}`;
            }

            delete params.API;

            return instance.put(API, params , {params: {token: params.token || '', ...params.query}});
        } else {
            return false;
        }
    }
};