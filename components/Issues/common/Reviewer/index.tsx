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
import {RELOAD_ISSUE, RELOAD_ISSUES} from 'constants/event';

// Antd
const {Option} = Select;

import {SizeType} from 'antd/lib/config-provider/SizeContext';
import {STATUS_RESOLVED} from 'constants/issues';

interface ReviewerProps {
    role: any,
    issue: any,
    size?: SizeType,
    members: any[],
    projectId: any,
}

const Reviewer: React.FC<ReviewerProps> = ({
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
                reviewer: value
            };

            await issueServices.update({
                id: projectId,
                type: 'update-reviewer',
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
            value={selectValue(issue.reviewer)}
            loading={isLoading}
            placeholder='Reviewer'
        >
            {Array.isArray(members) ? members.map(member => (
                <Option key={member.email} value={member.email}>{member.fullName}</Option>
            )) : null}
        </Select>
    );
};

export default Reviewer;