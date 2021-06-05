// Libraries
import React from 'react';
import {Typography, Divider, Space} from 'antd';
import {Droppable} from 'react-beautiful-dnd';

// Antd
const {Title} = Typography;

interface IssueListProps {
    title: string,
    id: string,
    issues: any[]
}

const IssueList: React.FC<IssueListProps> = ({
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
                    <Divider />
                    <Space direction='horizontal' className='w-full'>
                        {issues && issues.length ? issues.map(issue => (
                            <div key={issue.id}>{issue.name}</div>
                        )) : null}
                    </Space>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default IssueList;