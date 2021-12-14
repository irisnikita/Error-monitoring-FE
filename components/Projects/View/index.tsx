/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col, Typography, Spin, Tooltip, Divider,  Button, Card} from 'antd';
import moment from 'moment';
import Link from 'next/link';
import classnames from 'classnames';

// Redux toolkit
import {selectUser} from 'slice/layoutSlice';

// Services
import * as projectServices from 'services/project';

// Components
import Layout from 'components/Layout';

// Helpers
import {handelError} from 'helpers';

// Constant
import {platforms, projectStatus} from 'constants/index';

// Typings
import {IProject} from 'typings/project';

// Antd
const {Title} = Typography;

interface ProjectsProps {
    
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const Projects: React.FC<ProjectsProps> = () => {
    const [isLoading, setLoading] = useState(false);
    const [projects, setProjects] = useState<IProject[]>([]);

    const [assignProjects, setAssignProjects] = useState<IProject[]>([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (Object.keys(user).length) {
            getProjects();
        }
    }, [user]);

    const getProjects = async () => {
        setLoading(true);
        try {
            const responseProjects = await projectServices.getList();
          
            if (responseProjects && responseProjects.data) {
                const {status, data} = responseProjects.data;

                if (status) {
                    const myProjects: Array<IProject> = data.filter((project: IProject) => project.createUser === user.email);
                    const assignProjects: Array<IProject> = data.filter((project: IProject) => project.createUser !== user.email && project.active !== false);

                    setProjects(myProjects);
                    setAssignProjects(assignProjects);
                }
            }

        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    const showRenderProjects = (projects: IProject[]) => {
        return projects && projects.length ? projects.map((project) => {
            const {name, platform, createTime, id, active, issues = []} = project;
            const logoPlatform = platforms.find(p => p.key === platform)?.logo;
            const status = projectStatus.find(p => p.value === active);

            return (
                <Col key={id} xxl={{span: 6}} lg={{span: 8}} md={{span: 12}} xs={{span: 24}} >
                    <Card title={<div className='project-card flex'>
                        <img src={logoPlatform} alt={name} width='30' height='30' className='mr-10 img-fix-cover' />
                        <div className='w-full'>
                            <Row>
                                <Col xs={{span: 24}} md={{span: 12}} className='flex a-c'>
                                    <span className={classnames('__status', {
                                        '--in-active': !status?.value
                                    })} />
                                    <Link href={`/dashboard/projects/${id}`}>
                                        <div className={classnames('__title text-ellipsis', {
                                            '--in-active': !status?.value
                                        })}>{name}</div>
                                    </Link>
                                </Col>
                                <Col xs={{span: 24}} md={{span: 12}} className='flex a-c j-e'>
                                    <Tooltip title='Created date' mouseEnterDelay={0.3}>
                                        <div className='__created-at'>{moment(createTime).format('DD-MM-YYYY')}</div>
                                    </Tooltip>
                                </Col>
                            </Row>
                            <div className='__sub-info flex a-c gap-5'>
                                <span>{issues.length} errors</span>
                            </div>
                        </div>
                    </div>} />
                </Col>
            );
        }) : null;
    };

    return (
        <Layout isDashboard>
            <Spin spinning={isLoading}>
                <div className='flex a-c j-b mb-20'>
                    <Title level={4} className='projects-title'>Projects</Title>
                    <Link href='/dashboard/projects/create'>
                        <Button type='default' icon={<i className='icon-hvh-plus mr-5' />}>Create project</Button>
                    </Link>
                </div>
                {projects.length ? (
                    <>
                        <Divider orientation="left" >{user.organization} projects</Divider>
                        <Row gutter={[10, 10]}>
                            {showRenderProjects(projects)}
                        </Row>
                    </>
                ) : null}
                {
                    assignProjects.length ? (
                        <>
                            <Divider orientation="left" >Assign projects</Divider>
                            <Row gutter={[10, 10]}>
                                {showRenderProjects(assignProjects)}
                            </Row>
                        </>
                    ) : null
                }
            </Spin>
        </Layout>
    );
};

export default Projects;