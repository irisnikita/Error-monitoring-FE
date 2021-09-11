export const formatNameToAvatar = (name: String = '') => {
    let array = name.trim().split(' ');

    return [array[0], array[array.length - 1]]
        .map((item) => item?.charAt(0))
        .join('')
        .toUpperCase();
};

export const selectValue = (value: any) => {
    return value === '' ? null : value;
};

export const convertToSlug = (text: string = '') => {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

export const getNameFromEmail = (str: string = '') => {
    return str.replace(/@.*$/,'');
};