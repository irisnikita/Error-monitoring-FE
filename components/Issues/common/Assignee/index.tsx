// Libraries
import React, {useState} from 'react';

// Components
import {Select} from 'antd';
import {selectValue} from 'utils';

// Services
import * as issueServices from 'services/issue';

// Helpers
import {handelError, isEditIssue} from 'helpers';
import emitter from 'helpers/mitt';

// Constants
import {RELOAD_ISSUES} from 'constants/event';

// Antd
const {Option} = Select;

interface AssigneeProps {
    role: any,
    issue: any,
    members: any[],
    projectId: string,
}

const Assignee: React.FC<AssigneeProps> = ({
    role,
    members,
    issue,
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
                priority: issue.priority,
                status: issue.status
            };

            await issueServices.update({
                id: projectId,
                type: 'update-issue',
                issue: {...params}
            });

            emitter.emit(RELOAD_ISSUES);
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Select 
            disabled={!isEditIssue(role)}
            onChange={onChange}
            value={selectValue(issue.assignee)}
            loading={isLoading}
            placeholder='Assignee'
        >
            {members.map(member => (
                <Option key={member.email} value={member.email}>{member.fullName}</Option>
            ))}
        </Select>
    );
};

export default Assignee;