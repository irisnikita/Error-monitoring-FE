// Libraries
import React, {useEffect, useMemo, useState} from 'react';
import {Breadcrumb, Typography, Tabs, Space, Spin} from 'antd';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {useSelector} from 'react-redux';

// Components
import Layout from 'components/Layout';
import Assignee from 'components/Issues/common/Assignee';
import DueDate from 'components/Issues/common/DueDate';
import Status from 'components/Issues/common/Status';
import TabDetail from './Tabs/TabDetail';

// Services
import * as issueServices from 'services/issue';
import * as projectServices from 'services/project';
import * as userServices from 'services/user';

// Helpers
import {handelError} from 'helpers';
import emitter from 'helpers/mitt';

// Constants
import {VIEWER} from 'constants/project';
import {RELOAD_ISSUE} from 'constants/event';

const {Title, Paragraph} = Typography;
const {TabPane} = Tabs;

const tabs = [
    {key: 'detail', label: 'Detail'}
];

interface DetailIssueProps {
}

const DetailIssue: React.FC<DetailIssueProps> = () => {
    const currentUser = useSelector((state: any) => state.layout.user);

    // State
    const [isLoading, setLoading] = useState(false);
    const [tab, setTab] = useState(tabs[0].key);
    const [project, setProject] = useState<any>({});
    const [members, setMembers] = useState<any[]>([]);
    const [issue, setIssue] = useState<any>({});
    const {
        name,
        path,
        description
    } = issue;

    const router = useRouter();

    const {id, pId} = router.query;

    const role = useMemo(() => {
        if (Object.keys(project).length) {
            const user = project.userList.find((u: any) => u.email === currentUser.email);
      
            return user.role || VIEWER;
        }
    }, [project]);

    useEffect(() => {
        if (id && pId) {
            getIssue();

            getProject();

            getMembers();
        }
    }, [id, pId]);

    useEffect(() => {
        emitter.on(RELOAD_ISSUE, getIssue);

        return () => {
            emitter.off(RELOAD_ISSUE, getIssue);
        };
    });

    const getIssue = async () => {
        setLoading(true);

        try {
            const response = await issueServices.get({
                id
            }, pId);

            if (response && response.data) {
                const {data} = response.data;

                setIssue(data);
            }
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    const getMembers = async () => {
        try {
            const response = await userServices.get({
                id: pId
            });

            if (response && response.data) {
                const {data} = response.data;

                setMembers(data);
            }
        } catch (error) {
            handelError();
        }
    };

    const getProject = async () => {
        try {
            const response = await projectServices.get({
                id: pId
            });

            if (response && response.data) {
                const {data} = response.data;

                setProject(data);
            }
        } catch (error) {
            handelError();
        }
    };

    const showRenderTabContent = () => {
        switch (tab) {
            case 'detail':
                return <TabDetail issue={issue} />;
            
            default:
                return  <TabDetail issue={issue} />;
        }
    };

    return (
        <Layout isDashboard>
            <Spin  spinning={isLoading}>
                <Breadcrumb>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href='/dashboard/issues'>
                            Issues
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <strong>Issue</strong>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Space style={{justifyContent: 'space-between'}} align='start' className='w-full mt-10'>
                    <div>
                        <div className='flex a-c gap-5'>
                            <Title level={4} className='m-0'>{name}</Title>
                            <Paragraph className='m-0'>({path})</Paragraph>
                        </div>
                        <Paragraph type='warning' className='text-capitalize'>{description}</Paragraph>
                    </div>
                    <Space size={20}>
                        <div>
                            <Title level={5} className='m-0'>Status</Title>
                            <Status size='large' role={role} issue={issue} projectId={pId} />
                        </div>
                        <div>
                            <Title level={5} className='m-0'>DueDate</Title>
                            <DueDate size='large' role={role} issue={issue} projectId={pId} />
                        </div>
                        <div>
                            <Title level={5} className='m-0'>Assignee</Title>
                            <Assignee members={members} size='large' role={role} issue={issue} projectId={pId} />
                        </div>
                    </Space>
                </Space>
                <div className='b-white p-20 mt-20'>
                    <Tabs activeKey={tab} onChange={(key) => setTab(key) }>
                        {tabs.map(tab => (
                            <TabPane tab={tab.label} key={tab.key}>
                                {showRenderTabContent()}
                            </TabPane>
                        ))}
                    </Tabs>
                    
                </div>
            </Spin>
        </Layout>
    );
};

export default DetailIssue;