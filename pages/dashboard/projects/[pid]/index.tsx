
/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Breadcrumb, Button, Spin, Row, Col, Typography, Divider} from 'antd';
import Link from 'next/link';

// User hooks
import useMounted from 'hooks/useMounted';

// Services
import * as projectServices from 'services/project';

// Components
import Layout from 'components/Layout';
import DailyErrorChart from 'components/Charts/DailyErrorChart';

// Interface
interface ProjectDetailProps {
    
}

type project = {
    active: boolean,
    createTime: string,
    createUser: string,
    envList: string[],
    id: string,
    name: string,
    platform: string,
    userList: Record<string, unknown>[]
}

const initialProject = {
    active: false,
    createTime: '',
    createUser: 'String',
    envList: [],
    id: '',
    name: '',
    platform: '',
    userList: []
};

// helper
import {handelError, getIconPlatform} from 'helpers';

// Antd 
const {Title} = Typography;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const ProjectDetails: React.FC<ProjectDetailProps> = () => {
    const router = useRouter();
    const {pid = ''} = router.query;
    const mounted = useMounted();

    // state
    const [project, setProject] = useState<project>(initialProject);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (mounted.current) {
            getProjectDetail();
        }
    }, [pid]);

    const getProjectDetail = async () => {

        setLoading(true);
        try {
            const responseProject = await projectServices.get({
                id: pid
            });

            if (responseProject && responseProject.data) {
                const {data} = responseProject.data;

                setProject(data);
            }

        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <Layout isDashboard>
            <Spin spinning={isLoading}>
                <div className='project-details-wrapper'>
                    <div className='mb-20 flex a-c j-b'>
                        <Breadcrumb >
                            <Breadcrumb.Item >
                                <Link href='/dashboard/projects'>Projects</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                Project details
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div className='flex a-c gap-5'>
                            <Button>View All Issues</Button>
                            <Button>Create Alert</Button>
                            <Link href={`/dashboard/projects/${pid}/setting`}>
                                <Button icon={<i className='icon-hvh-cog' />} />
                            </Link>
                        </div>
                    </div>
                    <div className='flex a-c gap-5'>
                        <img src={getIconPlatform(project.platform)} width='40px' alt={project.platform} />
                        <Title level={4} className='projects-title'>{project.name}</Title>
                    </div>
                    <Divider />
                    <Row>
                        <Col xs={{span: 24}}  md={{span: 16}} className='chart-wrapper'>
                            <DailyErrorChart height={500} />
                        </Col>
                        <Col xs={{span: 24}}  md={{span: 8}}>
                            <Divider type='vertical' style={{height: '100%'}} />
                        </Col>
                    </Row>
                </div>
            </Spin>
         
        </Layout>
    );
};

export default ProjectDetails;