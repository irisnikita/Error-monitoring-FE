import moment from 'moment';

export const date = (value = '', type = '', format = 'MMM DD hh:mm A' ) => {
    return moment(value, type).format(format);
};