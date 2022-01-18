// Libraries
import React from 'react';
import {Card, Typography, Space} from 'antd';
import {Draggable} from 'react-beautiful-dnd';
import moment from 'moment';
import Link from 'next/link';

// Components
import Assignee from 'components/Issues/common/Assignee';
import Reviewer from 'components/Issues/common/Reviewer';
import Priority from 'components/Issues/common/Priority';
import DueDate from 'components/Issues/common/DueDate';

// Helpers
import {getIssueStatusColor, isEditIssue} from 'helpers';

interface IssueItemProps {
    projectId: string,
    role: any,
    members: any[],
    issue: any
    index: number,
}

// Antd
const {Title, Paragraph} = Typography;

const IssueItem: React.FC<IssueItemProps> = ({
    members,
    projectId,
    issue,
    role,
    index
}) => {
    const {
        id,
        name,
        status,
        description,
        createTime,
        path
    } = issue;
    
    return (
        <Draggable draggableId={id} index={index} isDragDisabled={!isEditIssue(role)}>
            {(provided, snapshot) => (
                <div
                    id={`task-${id}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card>
                        <div
                            style={{
                                backgroundColor: getIssueStatusColor(status),
                                width: '30%',
                                height: '5px',
                                borderRadius: '10px'
                            }}
                        />
                        <div className='flex a-c j-b'>
                            <Link href={`/dashboard/issues/${projectId}/${issue.id}`}>
                                {name}
                            </Link>
                            <Assignee role={role} members={members} issue={issue} projectId={projectId} />
                        </div>
                        <Paragraph 
                            type='secondary'
                            className='m-0 mw-50p text-nowrap text-ellipsis'
                        >
                            ({path})
                        </Paragraph>   
                        <Paragraph >
                            {description}
                        </Paragraph>  
                        <div className='flex a-c w-full gap-10' style={{flexFlow: 'wrap'}}>
                            <Space align='center' size={5}>
                                <i className='icon-hvh-clock' />
                                {moment(createTime).fromNow()}
                                {moment(createTime).format('DD/MM/YYYY')}
                            </Space>
                            <Priority role={role} projectId={projectId} issue={issue} />
                            <DueDate size='small' issue={issue} projectId={projectId} role={role} />
                            <Reviewer role={role} members={members} issue={issue} projectId={projectId} size={'small'} />
                        </div>
                    </Card> 
                </div>
            )}
        </Draggable>
    );
};

export default IssueItem;