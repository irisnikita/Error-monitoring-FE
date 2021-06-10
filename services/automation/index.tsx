import {services} from '../services';

export function create(params?: any) {
    return services.create({...params,API: process.env.NEXT_PUBLIC_API_URL + '/suite'});
}

export function update(params?: any) {
    return services.update({...params,API: process.env.NEXT_PUBLIC_API_URL + '/suite'});
}

export function del(params?: any) {
    return services.create({...params,API: process.env.NEXT_PUBLIC_API_URL + '/suite'});
}

export function getList(params?: any) {
    return services.get({...params,API: process.env.NEXT_PUBLIC_API_URL + '/suite'});
}

export function get(params?: any, pId?: any) {
    return services.get({...params,API: process.env.NEXT_PUBLIC_API_URL + `/suite/${pId}`});
}