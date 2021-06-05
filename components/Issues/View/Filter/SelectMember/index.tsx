// Libraries
import React, {useEffect, useState} from 'react';
import {Avatar, Tooltip, Space, Spin} from 'antd';

// Services
import * as userServices from 'services/user';

// Helpers
import {handelError} from 'helpers';
import {formatNameToAvatar} from 'utils';

interface SelectMemberProps {
    projectId: string,
    value: string,
    name: string
    onChange: (value: string, name: string) => void
}

const SelectMember: React.FC<SelectMemberProps> = ({
    projectId,
    value,
    name,
    onChange
}) => {
    // State
    const [members, setMembers] = useState<any[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (projectId) {
            getMembers();
        }
    }, [projectId]);

    const getMembers = async () => {
        setLoading(true);
        try {
            const response = await userServices.get({
                id: projectId
            });

            if (response && response.data) {
                const {data} = response.data;

                setMembers(data);
            }
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    const onClickAvatar = (email: string) => {
        onChange(email === value ? '' : email, name);
    };

    return (
        <Spin spinning={isLoading}>
            <Space>
                {members && members.length ? members.map((member) => (
                    <div className="c-p" key={member.email} onClick={() => onClickAvatar(member.email)}>
                        <Tooltip mouseEnterDelay={1} title={`${member.fullName} (${member.email})`}>
                            <Avatar 
                                style={{background: member.email === value ? '#08979c' : 'grey'}}>
                                {formatNameToAvatar(member.fullName)}
                            </Avatar>
                        </Tooltip>
                    </div>
                )) : null}
            </Space>
           
        </Spin>
    );
};

export default SelectMember;