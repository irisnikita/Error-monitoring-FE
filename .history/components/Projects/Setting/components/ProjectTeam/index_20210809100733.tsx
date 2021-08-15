/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useEffect, useMemo, useState} from 'react';
import {Typography, Modal, Tag, Table, Space, Button, Select, Input, Dropdown, Menu, Spin, Row, Col, message} from 'antd';
import {useSelector} from 'react-redux';

// Redux toolkit
import {selectUser} from 'slice/layoutSlice';

// User hooks
import useMounted from 'hooks/useMounted';
import useDebounce from 'hooks/useDebounce';

// Typings
import {IProject} from 'typings/project';

// Services
import * as userServices from 'services/user';
import * as projectServices from 'services/project';
import * as searchServices from 'services/search';

// Constant
import {ADMIN, ADMIN_LABEL, EDITOR, OWNER, ROLE_LIST, VIEWER} from 'constants/project';

// Helpers
import {handelError} from 'helpers';

const {Title, Paragraph} = Typography;
const {Option} = Select;

interface ProjectTeamProps {
    project: IProject,
    onReload: Function
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const ProjectTeam: React.FC<ProjectTeamProps> = ({project, onReload}) => {
    const {id, userList, createUser} = project;

    const mounted = useMounted();

    // User
    const user = useSelector(selectUser);
    const [searchUsers, setSearchUsers] = useState<any>([]);

    const currentRole: any = useMemo(() => {
        if (Object.keys(user).length) {
            return userList.find(u => u.email === user.email)?.role;
        }
    }, [user]);

    // State
    const [isLoading, setLoading] = useState(false);
    const [isLoadingSelect, setLoadingSelect] = useState(false);
    const [members, setMembers] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const [isOpenModalAdd, setOpenModalAdd] = useState(false);
    const [addUser, setAddUser] = useState<any>({});
    const [isLoadingAddMember, setLoadingAddMember] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const debounceSearch = useDebounce(valueSearch, 500);

    useEffect(() => {
        getSearchUsers(debounceSearch);
    }, [debounceSearch]);

    useEffect(() => {
        if (mounted.current) {
            getMembers();
        }
    }, [project]);

    const columns:any = [
        {
            dataIndex: 'member',
            key: 'member',
            render: (_text: string, row: any) => {
                return (
                    <div>
                        <Title level={5} className='m-0'>{row.member.fullName}</Title>
                        <Paragraph style={{marginBottom: 0}}>{row.member.email}</Paragraph>
                    </div>
                );
            }
        },
        {
            dataIndex: 'role',
            width: '200px',
            key: 'role',
            render: (text: string) => {
                const role = ROLE_LIST.find(r => r.key === text);
                   
                return (
                    <Tag color={role ? role.color : 'cyan'}>{role ? role.label : ADMIN_LABEL}</Tag>
                );
            }
        },
        {
            dataIndex: 'action',
            align: 'right',
            width: '250px',
            key: 'action',
            render: (_text: string, row: any) =>  {
                let isAccess = handleAccess(row.role, row.member.email);

                return (
                    <Space>
                        <Button disabled={!isAccess} onClick={() => {
                            setIsEdit(true);
                            setOpenModalAdd(true);
                            setAddUser({
                                email: row.member.email,
                                fullName: row.member.fullName,
                                role: row.role
                            });
                        }} >
                            <i className='icon-hvh-pencil' />
                        </Button>
                        <Button disabled={!isAccess} onClick={() => onClickDelete(row)} danger><i className='icon-hvh-bin' /></Button>
                    </Space>
                );
            }
        }
    ];

    const getSearchUsers = async (debounceSearch: any) => {
        setLoadingSelect(true);

        try {
            const response = await searchServices.search({
                query: {
                    filter: debounceSearch,
                    type: 'user'
                }
            });

            if (response && response.data) {
                const {data} = response.data;

                if (Array.isArray(data)) {
                    let draftUsers = data.filter((item: any) => !userList.some((i: any) => i.email === item.email));

                    setSearchUsers(draftUsers || []);
                } else {
                    setSearchUsers([]);
                }
            }
        } catch (error) {
            handelError();
        } finally {
            setLoadingSelect(false);

        }
    };

    const handleAccess = (role: string, email: string) => {
        switch (role) {
            case OWNER:
                return false;
            case ADMIN:
                if (ADMIN === currentRole && user.email === email) {
                    return true;
                }

                if (OWNER === currentRole) {
                    return true;
                }

                return false;
            case EDITOR:
            case VIEWER:
                if ([ADMIN, OWNER].indexOf(currentRole) !== -1) {
                    return true;
                }

                return false;
            default:
                return false;
        }
    };

    const getMembers = async () => {
        setLoading(true);

        try {
            const responseMembers = await userServices.get({
                id
            });

            if (responseMembers && responseMembers.data) {
                const {data = [], status} = responseMembers.data;

                if (status) {
                    const draftMembers: [] = data.map((item: any) => ({
                        key: item.email,
                        member: {
                            fullName: item.fullName,
                            email: item.email
                        },
                        role: userList.find(u => u.email === item.email)?.role
                    }));

                    draftMembers.sort((u: any, u2: any) => {
                        let role: any = ROLE_LIST.find(r => r.key === u.role)?.priority;
                        let role2: any = ROLE_LIST.find(r => r.key === u2.role)?.priority;

                        return role2 - role;
                    });

                    setMembers(draftMembers);
                }
            }
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    const onClickDelete = (row: any) => {
        const {member} = row;

        Modal.confirm({
            title: 'Delete member ?',
            content: `Are you sure to delete ${member.fullName} member`,
            onOk: async () => {
                try {
                    const response = await projectServices.update({
                        type: 'remove-member',
                        project: {
                            id,
                            userList: [
                                {
                                    email: member.email
                                }
                            ]
                        }
                    });

                    if (response && response.data) {
                        onReload();
                    }
                } catch (error) {
                    handelError();
                } finally {
                    //
                }
            }
        });
    };
    
    const onOkAddMember = () => {
        if (!addUser.role) {
            message.error('Please select role');
        } else {
            onOkModal();
        }
    };

    const onOkModal = async () => {
        setLoadingAddMember(true);
        
        try {
            const response = await projectServices.update({
                type: isEdit ? 'modify-member' : 'add-member',
                project: {
                    id,
                    userList: [
                        {
                            email: addUser.email,
                            role: addUser.role
                        }
                    ]
                }
            });

            if (response && response.data) {
                setOpenModalAdd(false);
                onReload();
                setAddUser({});
                setIsEdit(false);
            }

        } catch (error) {
            handelError();
        } finally {
            setLoadingAddMember(false);
        }
    };

    const onChangeSelectUser = (value: any) => {
        setAddUser({
            ...addUser,
            role: value
        });
    };

    const menu = (
        <Menu>
            {searchUsers && searchUsers.length ? searchUsers.map((user: any) => (
                <Menu.Item key={user.email} onClick={(e) => {
                    let user = searchUsers.find((u: any) => u.email === e.key);

                    setAddUser(user);
                    setIsEdit(false);
                    setTimeout(() => {
                        setOpenModalAdd(true);
                    }, 200);
                }}>
                    <div className='flex a-c gap-5'>
                        <Title level={5} className='m-0'>{user.fullName}</Title>
                        {user.organization ? <Tag color='cyan'>{user.organization}</Tag> : null}
                    </div>
                    <span>{user.email}</span>
                </Menu.Item>
            
            )) : <div className='t-c p-10'>Not found user</div>}
        </Menu>
    );

    return (
        <div>
            <Title level={4}>Project team</Title>
            <Dropdown disabled={[ADMIN, OWNER].indexOf(currentRole) === -1} overlay={menu} trigger={['click']}>
                <Spin spinning={isLoadingSelect}>
                    <Input disabled={[ADMIN, OWNER].indexOf(currentRole) === -1}  size='large' placeholder='Search user to invite' onChange={(e) => {setValueSearch(e.target.value)}} />
                </Spin>
            </Dropdown>
            <Table showHeader={false} className='mt-20'  loading={isLoading} scroll={{y: 400}} size='small' columns={columns} dataSource={members} />
            <Modal 
                visible={isOpenModalAdd} 
                onOk={onOkAddMember}
                title={isEdit ? `Edit "${addUser.fullName}" member` : 'Add member'}
                onCancel={() => {setOpenModalAdd(false)}}
                footer={
                    <Space>
                        <Button type='default' onClick={() => {setOpenModalAdd(false)}}>Cancel</Button>
                        <Button loading={isLoadingAddMember} type='primary' onClick={onOkAddMember}>{isEdit ? 'Change role Member' : 'Add member'}</Button>
                    </Space>
                }
            >
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <Row gutter={[10, 10]}>
                            <Col span={24}>
                                <b style={{fontSize: 16}}>Role</b>
                                <Select size='large' placeholder={'Chose role'} style={{width: '100%'}} value={addUser.role} onChange={onChangeSelectUser}>
                                    {ROLE_LIST.filter(r => r.key !== OWNER).map(role => {
                                        return (
                                            <Option disabled={currentRole === ADMIN && addUser.email !== user.email && role.key === ADMIN} key={role.key} value={role.key}>{role.label}</Option>
                                        );
                                    })}
                                </Select></Col>
                            <Col span={24}>
                                <b style={{fontSize: 16}}>Trello email</b>
                                <Input size='large' placeholder='Input Trello email' />
                            </Col>
                            <Col span={24}>
                                <b style={{fontSize: 16}}>Slack email</b>
                                <Input size='large' placeholder='Input Slack email' />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
};

ProjectTeam.defaultProps = {
    onReload: () => {}
};

export default ProjectTeam;