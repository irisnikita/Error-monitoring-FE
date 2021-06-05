import {services} from '../services';

export function filter(params?: any) {
    return services.update({...params,API: process.env.NEXT_PUBLIC_API_URL + '/filter'});
}