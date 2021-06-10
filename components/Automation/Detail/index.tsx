// Libraries
import React, {useEffect, useState} from 'react';
import {Breadcrumb, Spin, Space, Typography, Avatar, Tabs} from 'antd';
import Link from 'next/link';
import moment from 'moment';
import {useRouter} from 'next/router';

// Components
import Layout from 'components/Layout';
import TabTestResults from './TabTestResults';

// Services
import * as automationServices from 'services/automation';

// Helpers
import {handelError, parseJson} from 'helpers';

interface DetailSuiteProps {
    
}

// Antd
const {Title} = Typography;
const {TabPane} = Tabs;

const tabs = [
    {key: 'test-results', label: 'Test results'}
];

const DetailSuite: React.FC<DetailSuiteProps> = () => {
    const router = useRouter();

    const {id, pId} = router.query;

    // State
    const [isLoading, setLoading] = useState(false);
    const [tab, setTab] = useState(tabs[0].key);
    const [suite, setSuite] = useState<any>({});

    const {
        startedTestsAt,
        totalDuration,
        totalSkipped,
        totalPending,
        totalPassed,
        totalFailed,
        totalTests,
        runs,
        branchInfo
    } = suite;

    console.log('🚀 ~ file: index.tsx ~ line 51 ~ suite', suite);

    // Branch 
    const {
        branch,
        message,
        email,
        author,
        sha,
        timestamp,
        remote
    } = parseJson(branchInfo);

    useEffect(() => {
        if (id && pId) {
            getSuite();
        }
    }, [id, pId]);
    
    const getSuite = async () => {
        setLoading(true);

        try {
            const response = await automationServices.get({
                id
            }, pId);

            if (response && response.data) {
                const {data} = response.data;

                setSuite(data);
            }
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };
    
    const showRenderTabContent = () => {
        switch (tab) {
            case 'test-results':
                return <TabTestResults suite={suite} />;
            
            default:
                return  <TabTestResults  suite={suite} />;
        }
    };

    const renderIconSuite: any = () => {
        return <i style={{color: !totalFailed ? '#389e0d' : '#cf1322'}} className={`icon-hvh-${totalFailed ? 'cross' : 'checkmark'}`} />;
    };

    const showRenderTabLabel: any = (label: string) => {
        switch (label) {
            case 'Test results':
                
                return `${label} (${totalTests})`;
        
            default:
                return label;
        }
    };

    return (
        <Layout isDashboard>
            <Breadcrumb>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href='/dashboard/automation'>
                            Automation
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <strong>Suite</strong>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Spin spinning={isLoading}>
                <div className='flex j-b mt-10'>
                    <div>
                        <div>
                            <Space align='center'>
                                {renderIconSuite()}
                                <Title level={4} className='m-0'>
                                    {message}
                                </Title>
                            </Space>
                        </div>
                        <Space className='mt-10'>
                            <Space>
                                <Avatar size='small' />
                                {author}
                            </Space>
                        •
                            <Space>
                                <i className='icon-hvh-clock' />
                                <span>Ran {moment(startedTestsAt).fromNow()}</span>
                            </Space>
                        •
                            <Space>
                                <i className='icon-hvh-hour-glass' />
                                <span>{moment.utc(totalDuration).format('HH:mm:ss')}</span>
                            </Space>
                        •
                            <Space>
                                <i className='icon-hvh-git' />
                                {branch}
                            </Space>
                        </Space>
                    </div>
                    <Space size={15}>
                        <Space size={5}>
                            <i className='icon-hvh-blocked' />
                            {totalSkipped}                        
                        </Space>
                        <Space size={5}>
                            <i className='icon-hvh-loop2' />
                            {totalPending}                        
                        </Space>
                        <Space size={5}>
                            <i style={{color: '#389e0d'}} className='icon-hvh-checkmark' />
                            {totalPassed}                        
                        </Space>
                        <Space size={5}>
                            <i style={{color: '#cf1322'}} className='icon-hvh-cancel-circle' />
                            {totalFailed}                        
                        </Space>
                    </Space>
                </div>
                <div className='b-white px-20 mt-20'>
                    <Tabs activeKey={tab} onChange={(key) => setTab(key) }>
                        {tabs.map(tab => (
                            <TabPane tab={<div>{showRenderTabLabel(tab.label)}</div>} key={tab.key}>
                                {showRenderTabContent()}
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            </Spin>
        </Layout>
    );
};

export default DetailSuite;