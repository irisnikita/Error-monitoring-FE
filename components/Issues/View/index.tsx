/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useEffect, useMemo, useState} from 'react';
import {Col, Row, Spin, Typography} from 'antd';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import {DragDropContext} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';

// Components
import Filter from './Filter';
import Layout from 'components/Layout';
import IssueList from './IssueList';

// Services
import * as userServices from 'services/user';
import * as issueServices from 'services/issue';
import * as projectServices from 'services/project';
import * as filterServices from 'services/filter';

// Filter
import {defaultFilter} from './Filter';

// Helpers
import {emitter} from 'helpers/mitt';
import {handelError, parseJson} from 'helpers';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Constants
import {
    STATUS_RESOLVED_LABEL,
    STATUS_RESOLVED,
    STATUS_PROCESSING_LABEL,
    STATUS_PROCESSING,
    STATUS_UNRESOLVED,
    STATUS_UNRESOLVED_LABEL
} from 'constants/issues';
import {RELOAD_ISSUES} from 'constants/event';
import {VIEWER} from 'constants/project';
import {FILTER_ISSUE} from 'constants/localStorage';

// Antd
const {Title} = Typography;

interface IssueViewProps {}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const IssueView: React.FC<IssueViewProps> = () => {
    const currentUser = useSelector((state: any) => state.layout.user);

    // State
    const [filter, setFilter] = useState(defaultFilter);
    const [issues, setIssues] = useState<any[]>([]);
    const [members, setMembers] = useState([]);
    const [project, setProject] = useState<any>({});

    const [isLoadingIssues, setLoadingIssues] = useState(false);

    const previousFilter = usePrevious(filter);

    useEffect(() => {
        if (localStorage.getItem(FILTER_ISSUE)) {
            const newFilter: any = JSON.parse((localStorage.getItem(FILTER_ISSUE) as any));

            const draft: any = {
                projectId: newFilter.projectId,
                environment: newFilter.environment,
                dateRange: newFilter.dateRange ? [moment(newFilter.dateRange[0]), moment(newFilter.dateRange[1])] : null,
                assignee: newFilter.assignee
            };

            setFilter(draft);
        }  
    }, []);

    // Use effect get issues
    useEffect(() => {
        if (!isEqual(filter, previousFilter)) {
            getIssues();
        }
    }, [filter]);

    useEffect(() => {
        if (filter.projectId) {
            getMembers();

            getProject();
        }
    }, [filter.projectId]);

    useEffect(() => {
        emitter.on(RELOAD_ISSUES, getIssues);

        return () => {
            emitter.off(RELOAD_ISSUES, getIssues);
        };
    });

    const role = useMemo(() => {
        if (Object.keys(project).length) {
            const user = project.userList.find(
                (u: any) => u.email === currentUser.email
            );

            return user ? user.role : VIEWER;
        }
    }, [project]);

    const getMembers = async () => {
        try {
            const response = await userServices.get({
                id: filter.projectId
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
                id: filter.projectId
            });

            if (response && response.data) {
                const {data} = response.data;

                setProject(data);
            }
        } catch (error) {
            handelError();
        }
    };

    const categories = useMemo(() => {
        let draftCategories: any = {
            [STATUS_UNRESOLVED]: {
                title: STATUS_UNRESOLVED_LABEL,
                issues: []
            },
            [STATUS_PROCESSING]: {
                title: STATUS_PROCESSING_LABEL,
                issues: []
            },
            [STATUS_RESOLVED]: {
                title: STATUS_RESOLVED_LABEL,
                issues: []
            }
        };

        if (issues && issues.length) {
            issues.forEach((issue) => {
                draftCategories[issue.status].issues.push(issue);
            });
        }

        return draftCategories;
    }, [issues]);

    // Function get issues
    const getIssues = async () => {
        setLoadingIssues(true);
        try {
            const params = {
                projectId: filter.projectId,
                assignee: filter.assignee,
                environment: filter.environment,
                fromDate:
          filter.dateRange && filter.dateRange.length
              ? moment(filter.dateRange[0]).format()
              : null,
                toDate:
          filter.dateRange && filter.dateRange.length
              ? moment(filter.dateRange[1]).format()
              : null
            };

            const response = await filterServices.filter({
                query: {
                    type: 'issue'
                },
                ...params
            });

            if (response && response.data) {
                const {data} = response.data;

                setIssues(data);
            }
        } catch (error) {
            handelError();
        } finally {
            setLoadingIssues(false);
        }
    };

    const onChangeFilter = (value: any, name: any) => {
        let draftFilter = {...filter};
        
        if (name === 'projectId') {
            draftFilter.assignee = '';
        }

        setFilter({
            ...draftFilter,
            [name]: value
        });

        localStorage.setItem(FILTER_ISSUE, JSON.stringify({
            ...draftFilter,
            [name]: value
        }));
    };

    const onDragEnd = async (newProps: any) => {
        const {destination = {}, draggableId = {}, source} = newProps;

        if (
            destination &&
      source &&
      destination.droppableId !== source.droppableId
        ) {
            const issue = issues.find((i) => i.id === draggableId);
            const index = issues.findIndex((i) => i.id === draggableId);
            const draftIssues = [...issues];

            draftIssues[index].status = destination.droppableId;

            setIssues(draftIssues);

            if (issue) {
                updateIssue(issue, destination.droppableId);
            }
        }
    };

    const updateIssue = async (issue: any, status: string) => {
        try {
            const params = {
                id: issue.id,
                assignee: issue.assignee,
                dueDate: issue.dueDate,
                priority: issue.priority,
                status: status
            };

            await issueServices.update({
                id: filter.projectId,
                type: 'update-issue',
                issue: {...params}
            });

            getIssues();
        } catch (error) {
            handelError();
        }
    };

    return (
        <Layout isDashboard>
            <Title level={4}>Issues</Title>
            <Filter filter={filter} onChange={onChangeFilter} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Spin spinning={isLoadingIssues}>
                    <Row gutter={10} className="mt-10">
                        {Object.keys(categories).map((key) => (
                            <Col key={key} span={8}>
                                <IssueList
                                    role={role}
                                    members={members}
                                    projectId={filter.projectId}
                                    title={categories[key].title}
                                    id={key}
                                    issues={categories[key].issues}
                                />
                            </Col>
                        ))}
                    </Row>
                </Spin>
            </DragDropContext>
        </Layout>
    );
};

export default IssueView;
