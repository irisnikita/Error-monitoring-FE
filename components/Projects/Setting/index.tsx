// libraries
import React, {useEffect, useState} from 'react';
import {Menu, Row, Col, Spin} from 'antd';

// Components
import Layout from 'components/Layout';
import GeneralSetting from './components/GeneralSetting';
import ProjectTeam from './components/ProjectTeam';
import IntegrationTrello from './components/IntegrationTrello';
import IntegrationSlack from './components/IntegrationSlack';
import IssuesSetting from './components/IssuesSetting';
import Notification from './components/Notification';
import {useDispatch, useSelector} from 'react-redux';

// Layout slice
import {
    selectUser
} from 'slice/layoutSlice';

// Services
import * as projectServices from 'services/project';

// helper
import {handelError} from 'helpers';

// Styles
import styles from './styles.module.scss';

// Project
import {IProject} from 'typings/project';

// Constant
import {initialProject} from 'constants/project';

interface SettingProps {
    pId: any
}

type projectItem = {
    key: string,
    label: string,
    isGuard?: boolean,
    child?: Array<{key: string, label: string, isGuard?: boolean,}>
}

const Setting: React.FC<SettingProps> = ({pId}) => {
    // state
    const [project, setProject] = useState<IProject>(initialProject);
    const [isLoading, setLoading] = useState(false);
    const user = useSelector(selectUser);
 
    const projectMenu: Array<projectItem> = [{
        key: 'project', label: 'Project', child: [
            {
                key: 'general-setting', label: 'General Settings'
            },
            {
                key: 'issues-setting', label: 'Issues Settings', isGuard: true
            },
            {
                key: 'project-team', label: 'Project Team'
            },
            {
                key: 'integration-trello', label: 'Integration Trello', isGuard: true
            },
            {
                key: 'integration-slack', label: 'Integration Slack', isGuard: true
            },
            {
                key: 'notification', label: 'Notification', isGuard: true
            }
        ]
    }];

    useEffect(() => {
        if (pId) {
            getProjectDetail();
        }
    }, [pId]);
   
    const getProjectDetail = async () => {

        setLoading(true);
        try {
            const responseProject = await projectServices.get({
                id: pId
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

    const [currentTab, setCurrentTab] = useState('general-setting');

    const showRenderProjectMenu = (menu: Array<projectItem>) => {
        return menu.map(item => {
            if (item.child) {
                return  <Menu.ItemGroup key={item.key} title={item.label}>
                    {showRenderProjectMenu(item.child)}
                </Menu.ItemGroup>;
            } else {
                if (item.isGuard && user.email !== project.createUser) {
                    return null;
                }

                return (
                    <Menu.Item key={item.key}>{item.label}</Menu.Item>
                );
            }
        });
    };

    const onClickMenuItem = (value: any) => {
        setCurrentTab(value.key);
    };

    const onReloadProject = () => {
        getProjectDetail();
    };

    const showRenderContent = () => {
        switch (currentTab) {
            case 'general-setting':
                return <GeneralSetting onReload={onReloadProject} project={project} />;
        
            case 'issues-setting':
                return <IssuesSetting onReload={onReloadProject} project={project} />;
        
            case 'project-team':
                return <ProjectTeam onReload={onReloadProject} project={project} />;
        
            case 'integration-trello':
                return <IntegrationTrello onReload={onReloadProject}  project={project} />;
        
            case 'integration-slack':
                return <IntegrationSlack onReload={onReloadProject}  project={project} />;
        
            case 'notification':
                return <Notification onReload={onReloadProject}  project={project} />;
        
            default:
                return <GeneralSetting onReload={onReloadProject} project={project} />;
        }
    };

    return (
        <Layout isDashboard>
            <Row gutter={[20, 20]} className='h-full' >
                <Col span={5}>
                    <Menu
                        onClick={onClickMenuItem}
                        className={styles['project__menu']}
                        selectedKeys={[currentTab]}
                        mode='inline'
                    >
                        {showRenderProjectMenu(projectMenu)}
                    </Menu>
                </Col>
                <Col span={19} className={styles['project-content--right']}>
                    <Spin spinning={isLoading}>
                        {showRenderContent()}
                    </Spin>
                </Col>
            </Row>
        </Layout>
    );
};

export default Setting;