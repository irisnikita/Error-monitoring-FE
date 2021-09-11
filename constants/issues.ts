export const STATUS_UNRESOLVED = 'unresolved';
export const STATUS_UNRESOLVED_LABEL = 'UnResolved';
export const STATUS_UNRESOLVED_COLOR = '#cf1322';

export const STATUS_PROCESSING = 'processing';
export const STATUS_PROCESSING_LABEL = 'Processing';
export const STATUS_PROCESSING_COLOR = '#d4b106';

export const STATUS_REVIEWING = 'reviewing';
export const STATUS_REVIEWING_LABEL = 'Reviewing';
export const STATUS_REVIEWING_COLOR = '#08979c';

export const STATUS_RESOLVED = 'resolved';
export const STATUS_RESOLVED_LABEL = 'Resolved';
export const STATUS_RESOLVED_COLOR = '#389e0d';

export const PRIORITY_LOW = 'low';
export const PRIORITY_LOW_LABEL = 'Low';
export const PRIORITY_LOW_COLOR = 'cyan';

export const PRIORITY_MEDIUM = 'medium';
export const PRIORITY_MEDIUM_LABEL = 'Medium';
export const PRIORITY_MEDIUM_COLOR = 'gold';

export const PRIORITY_HIGH = 'high';
export const PRIORITY_HIGH_LABEL = 'High';
export const PRIORITY_HIGH_COLOR = 'red';

export const STATUES = [
    {key: STATUS_UNRESOLVED, label: STATUS_UNRESOLVED_LABEL, color: STATUS_UNRESOLVED_COLOR},
    {key: STATUS_PROCESSING, label: STATUS_PROCESSING_LABEL, color: STATUS_PROCESSING_COLOR},
    {key: STATUS_REVIEWING, label: STATUS_REVIEWING_LABEL, color: STATUS_REVIEWING_COLOR},
    {key: STATUS_RESOLVED, label: STATUS_RESOLVED_LABEL, color: STATUS_UNRESOLVED_COLOR}
];

export const PRIORITIES = [
    {key: PRIORITY_LOW, label: PRIORITY_LOW_LABEL, color: PRIORITY_LOW_COLOR},
    {key: PRIORITY_MEDIUM, label: PRIORITY_MEDIUM_LABEL, color: PRIORITY_MEDIUM_COLOR},
    {key: PRIORITY_HIGH, label: PRIORITY_HIGH_LABEL, color: PRIORITY_HIGH_COLOR}
];