// Libraries
import React from 'react';
import {Card, Typography, Space} from 'antd';
import {Draggable} from 'react-beautiful-dnd';

// Components
import Assignee from 'components/Issues/Assingee';

// Helpers
import {getIssueStatusColor} from 'helpers';

interface IssueItemProps {
    projectId: string,
    members: any[],
    issue: any
    index: number
}

// Antd
const {Title, Paragraph} = Typography;

const IssueItem: React.FC<IssueItemProps> = ({members, projectId, issue, index}) => {
    const {
        id,
        name,
        status,
        description,
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
                            <Assignee members={members} issue={issue} projectId={projectId} />
                        </div>   
                        <Paragraph 
                            type='secondary'
                            className='mw-50p text-nowrap text-ellipsis'
                        >
                            ({path})
                        </Paragraph>                
                    </Card> 
                </div>
            )}
        </Draggable>
    );
};

export default IssueItem;