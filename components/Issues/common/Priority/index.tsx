// Libraries
import React, {useState} from 'react';
import {Button, Dropdown, Menu, Space, Spin, Tag} from 'antd';

// Services
import * as issueServices from 'services/issue';

// Constants
import {RELOAD_ISSUES} from 'constants/event';
import {PRIORITIES} from 'constants/issues';

// Helpers
import {getIssuePriorityColor, getIssuePriorityLabel, isEditIssue} from 'helpers/index';
import {handelError} from 'helpers';
import emitter from 'helpers/mitt';

interface PriorityProps {
    role: any,
    projectId: string,
    issue: any,
}

const Priority: React.FC<PriorityProps> = ({
    role,
    projectId,
    issue
}) => {
    const [isLoading, setLoading] = useState(false);

    const {priority} = issue;

    const onClickPriority = async ({key}: any) => {
        setLoading(true);
        try {
            const params = {
                id: issue.id,
                assignee: issue.assignee,
                dueDate: issue.dueDate,
                priority: key,
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

    const menu = (
        <Menu onClick={onClickPriority}>
            {PRIORITIES.map(priority => (
                <Menu.Item key={priority.key}>
                    {priority.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown disabled={!isEditIssue(role)} overlay={menu} trigger={['click']}>
            <Spin spinning={isLoading}>

                {!priority ? <Button size='small'>
                    <span>Priority</span>
                </Button> : (
                    <Tag color={getIssuePriorityColor(priority)}>Priority: {getIssuePriorityLabel(priority)}</Tag>
                )}
            </Spin>
        </Dropdown>
    );
};

export default Priority;