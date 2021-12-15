import {services} from '../services';

export function create(params?: any) {
    return services.create({...params,API: process.env.NEXT_PUBLIC_API_ALGOLIA});
}

export function update(params?: any) {
    return services.update({...params,API: process.env.NEXT_PUBLIC_API_ALGOLIA});
}

export function del(params?: any) {
    return services.create({...params,API: process.env.NEXT_PUBLIC_API_ALGOLIA});
}

export function getList(params?: any) {
    return services.get({...params,API: process.env.NEXT_PUBLIC_API_ALGOLIA});
}

export function get(params?: any) {
    return services.get({...params,API: process.env.NEXT_PUBLIC_API_ALGOLIA});
}

export function search(params?: any) {
    return services.update({...params,API: process.env.NEXT_PUBLIC_API_ALGOLIA});
}