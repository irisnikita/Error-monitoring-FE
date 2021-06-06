// Libraries
import React, {useEffect, useState} from 'react';

// Components
import {Button, Dropdown, Menu, Spin, Select} from 'antd';
import {selectValue} from 'utils';

// Antd
const {Option} = Select;

interface AssigneeProps {
    issue: any,
    members: any[],
    projectId: string
}

const Assignee: React.FC<AssigneeProps> = ({
    members,
    issue,
    projectId
}) => {
    const [isLoading, setLoading] = useState(false);

    const onChange = (value: any) => {
        console.log('🚀 ~ file: index.tsx ~ line 52 ~ onChange ~ value', value);
    };

    return (
        <Select 
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