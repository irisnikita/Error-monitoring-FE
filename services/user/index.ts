import {services} from '../services';

export function create(params?: any) {
    return services.create({...params,API: process.env.NEXT_PUBLIC_API_URL + '/user'});
}

export function update(params?: any) {
    return services.update({...params,API: process.env.NEXT_PUBLIC_API_URL + '/user'});
}

export function del(params?: any) {
    return services.create({...params,API: process.env.NEXT_PUBLIC_API_URL + '/user'});
}

export function getList(params?: any) {
    return services.get({...params,API: process.env.NEXT_PUBLIC_API_URL + '/user'});
}

export function get(params?: any) {
    return services.get({...params,API: process.env.NEXT_PUBLIC_API_URL + '/user'});
}

export function search(params?: any) {
    return services.update({...params,API: process.env.NEXT_PUBLIC_API_URL + '/user/search'});
}