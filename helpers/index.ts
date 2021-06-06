import {message} from 'antd';
import {platforms} from 'constants/index';

// Constants
import {STATUS_UNRESOLVED, STATUS_RESOLVED, STATUS_PROCESSING, STATUS_UNRESOLVED_COLOR, STATUS_PROCESSING_COLOR, STATUS_RESOLVED_COLOR} from 'constants/issues';

export const handelError = () => {
    message.error('Something went wrong! Please try again');
};

export const getIconPlatform = (key: String = '') => {
    let platform = platforms.find(p => p.key === key);

    return platform ? platform.logo : '/images/logo/logo-hvh.png';
};

export const getIssueStatusColor = (status: any) => {
    switch (status) {
        case STATUS_UNRESOLVED:
            return STATUS_UNRESOLVED_COLOR;
        case STATUS_PROCESSING:
            
            return STATUS_PROCESSING_COLOR;
        case STATUS_RESOLVED:
            
            return STATUS_RESOLVED_COLOR;
        default:
            return '#000';
    }
};