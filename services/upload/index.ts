import {services} from '../services';

export function uploadImage(params?: any) {
    return services.upload({
        ...params,
        API: process.env.NEXT_PUBLIC_API_IMG_URL
    });
}
