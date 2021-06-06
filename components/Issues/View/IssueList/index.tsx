// Libraries
import React from 'react';
import {Typography, Divider, Space} from 'antd';
import {Droppable} from 'react-beautiful-dnd';

// Components
import IssueItem from '../IssueItem';

// Antd
const {Title} = Typography;

interface IssueListProps {
    projectId: string,
    members: any[],
    title: string,
    id: string,
    issues: any[]
}

const IssueList: React.FC<IssueListProps> = ({
    members,
    projectId,
    title,
    id,
    issues
}) => {
    return (
        <Droppable droppableId={id} type="ISSUE">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <Title className='m-0' level={5}>{title}</Title>
                    <Divider style={{margin: '10px 0px 20px'}} />
                    <Space direction='vertical' className='w-full issue-list'>
                        {issues && issues.length ? issues.map((issue, index) => (
                            <IssueItem members={members} projectId={projectId} key={issue.id} index={index} issue={issue} />
                        )) : null}
                    </Space>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default IssueList;