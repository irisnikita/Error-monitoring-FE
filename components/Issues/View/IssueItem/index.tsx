// Libraries
import React from 'react';
import {Card, Typography, Space} from 'antd';
import {Draggable} from 'react-beautiful-dnd';
import moment from 'moment';

// Components
import Assignee from 'components/Issues/common/Assignee';
import Priority from 'components/Issues/common/Priority';
import DueDate from 'components/Issues/common/DueDate';

// Helpers
import {getIssueStatusColor} from 'helpers';

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
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card >
                        <div
                            style={{
                                backgroundColor: getIssueStatusColor(status),
                                width: '30%',
                                height: '5px',
                                borderRadius: '10px'
                            }}
                        />
                        <div className='flex a-c j-b'>
                            <Paragraph className='m-0' strong>{name}</Paragraph>
                            <Assignee role={role}  members={members} issue={issue} projectId={projectId} />
                        </div>   
                        <Paragraph 
                            type='secondary'
                            className='mw-50p text-nowrap text-ellipsis'
                        >
                            ({path})
                        </Paragraph>   
                        <Space size={20} className='w-full' style={{justifyContent: 'space-between'}}>
                            <Space align='center' size={5}>
                                <i className='icon-hvh-clock' />
                                {moment(createTime).fromNow(true)}
                            </Space>
                            <Priority role={role} projectId={projectId} issue={issue} />
                            <DueDate size='small' issue={issue} projectId={projectId} role={role} />
                        </Space> 
                    </Card> 
                </div>
            )}
        </Draggable>
    );
};

export default IssueItem;