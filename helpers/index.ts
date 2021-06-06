import {message} from 'antd';
import {platforms} from 'constants/index';

// Constants
import {
    STATUS_UNRESOLVED,
    STATUS_RESOLVED,
    STATUS_PROCESSING,
    STATUS_UNRESOLVED_COLOR,
    STATUS_PROCESSING_COLOR,
    STATUS_RESOLVED_COLOR,
    PRIORITY_LOW,
    PRIORITY_MEDIUM,
    PRIORITY_HIGH,
    PRIORITY_LOW_COLOR,
    PRIORITY_MEDIUM_COLOR,
    PRIORITY_HIGH_COLOR,
    PRIORITIES
} from 'constants/issues';
import {VIEWER} from 'constants/project';

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

export const getIssuePriorityColor = (priority: any) => {
    switch (priority) {
        case PRIORITY_LOW:
            return PRIORITY_LOW_COLOR;
            
        case PRIORITY_MEDIUM:
            
            return PRIORITY_MEDIUM_COLOR;
        case PRIORITY_HIGH:
            
            return PRIORITY_HIGH_COLOR;
        default:
            return '#000';
    }
};

export const getIssuePriorityLabel = (priority: any) => {
    const findPriority = PRIORITIES.find(p => p.key === priority);

    return findPriority ? findPriority.label : priority;
};

export const isEditIssue = (role: any) => {
    return role !== VIEWER;
};