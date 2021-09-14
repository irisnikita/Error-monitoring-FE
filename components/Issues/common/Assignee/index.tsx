// Libraries
import React, {useState} from 'react';
import {Avatar} from 'antd';

// Components
import {Select} from 'antd';
import {formatNameToAvatar, selectValue} from 'utils';

// Services
import * as issueServices from 'services/issue';

// Helpers
import {handelError, isEditIssue} from 'helpers';
import emitter from 'helpers/mitt';

// Constants
import {RELOAD_ISSUE, RELOAD_ISSUES} from 'constants/event';

// Antd
const {Option} = Select;

import {SizeType} from 'antd/lib/config-provider/SizeContext';
import {STATUS_RESOLVED} from 'constants/issues';

interface AssigneeProps {
    role: any;
    issue: any;
    size?: SizeType;
    members: any[];
    projectId: any;
}

const Assignee: React.FC<AssigneeProps> = ({
    role,
    members,
    issue,
    size,
    projectId
}) => {
    const [isLoading, setLoading] = useState(false);

    const onChange = async (value: any) => {
        setLoading(true);
        try {
            const params = {
                id: issue.id,
                assignee: value,
                dueDate: issue.dueDate,
                startDate: issue.startDate,
                priority: issue.priority,
                status: issue.status
            };

            await issueServices.update({
                id: projectId,
                type: 'update-issue',
                issue: {...params}
            });

            emitter.emit(RELOAD_ISSUES);
            emitter.emit(RELOAD_ISSUE);
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Select
            size={size}
            disabled={!isEditIssue(role) || issue.status === STATUS_RESOLVED}
            onChange={onChange}
            value={selectValue(issue.assignee)}
            loading={isLoading}
            style={{width: 170}}
            placeholder="Assignee"
        >
            {Array.isArray(members)
                ? members.map((member) => (
                    <Option key={member.email} value={member.email}>
                        <div className='flex a-c gap-5'>
                            <Avatar style={{flexShrink: 0}} src={member.avatar} size='small'>{formatNameToAvatar(member.fullName)}</Avatar>
                            <span>{member.fullName}</span>
                        </div>
                    </Option>
                ))
                : null}
        </Select>
    );
};

export default Assignee;
