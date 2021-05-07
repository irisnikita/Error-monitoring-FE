import {message} from 'antd';
import {platforms} from 'constants/index';

export const handelError = () => {
    message.error('Something went wrong! Please try again');
};

export const getIconPlatform = (key: String = '') => {
    let platform = platforms.find(p => p.key === key);

    return platform ? platform.logo : '/images/logo/logo-hvh.png';
};
