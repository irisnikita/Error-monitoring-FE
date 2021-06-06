// Libraries
import React, {useState} from 'react';
import {Select} from 'antd';

// Helpers
import emitter from 'helpers/mitt';
import {handelError, isEditIssue} from 'helpers';

// Constants
import {STATUES} from 'constants/issues';
import {RELOAD_ISSUE} from 'constants/event';

// Services
import * as issueServices from 'services/issue';
import {SizeType} from 'antd/lib/config-provider/SizeContext';

interface StatusProps {
    issue: any,
    projectId: any,
    role: any,
    size: SizeType
}

const Status: React.FC<StatusProps> = ({
    projectId,
    issue,
    size,
    role
}) => {

    const [isLoading, setLoading] = useState(false);

    const onChange = async (value: any) => {
        setLoading(true);
        try {
            const params = {
                id: issue.id,
                assignee: issue.assignee,
                dueDate: issue.dueDate,
                priority: issue.priority,
                status: value
            };

            await issueServices.update({
                id: projectId,
                type: 'update-issue',
                issue: {...params}
            });

            emitter.emit(RELOAD_ISSUE);
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Select size={size} disabled={!isEditIssue(role)} loading={isLoading} onChange={onChange} value={issue.status}>
            {STATUES.map(status => (
                <Select.Option key={status.key} value={status.key}>
                    {status.label}
                </Select.Option>
            ))}
        </Select>
    );
};

export default Status;