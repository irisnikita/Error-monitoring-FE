/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useEffect, useMemo, useState} from 'react';
import {Col, Row, Spin, Typography} from 'antd';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import {DragDropContext} from 'react-beautiful-dnd';

// Components
import Filter from './Filter';
import Layout from 'components/Layout';
import IssueList from './IssueList';

// Antd
const {Title} = Typography;

// Filter
import {defaultFilter} from './Filter';

// Services
import * as filterServices from 'services/filter';

// Hooks
import usePrevious from 'hooks/usePrevious';
import {handelError} from 'helpers';
import {STATUS_RESOLVED_LABEL, STATUS_RESOLVED, STATUS_PROCESSING_LABEL,STATUS_PROCESSING, STATUS_UNRESOLVED, STATUS_UNRESOLVED_LABEL} from 'constants/issues';

interface IssueViewProps {
    
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const IssueView: React.FC<IssueViewProps> = () => {
    // State
    const [filter, setFilter] = useState(defaultFilter);
    const [issues, setIssues] = useState<any[]>([]);

    const [isLoadingIssues, setLoadingIssues] = useState(false);
    
    const previousFilter = usePrevious(filter);

    // Use effect get issues
    useEffect(() => {
        if (!isEqual(filter, previousFilter)) {
            getIssue();
        }
    }, [filter]);

    const categories = useMemo(() => {
        let draftCategories:any = {
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
    const getIssue = async () => {
        setLoadingIssues(true);
        try {
            const params = {
                projectId: filter.projectId,
                assignee: filter.assignee,
                environment: filter.environment,
                fromDate:filter.dateRange && filter.dateRange.length ? moment(filter.dateRange[0]).format() : null,
                toDate: filter.dateRange && filter.dateRange.length ? moment(filter.dateRange[1]).format() : null
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
        if (name === 'projectId') {
            setFilter((filter) => ({
                ...filter,
                assignee: ''
            }));
        }
        
        setFilter((filter) => ({
            ...filter,
            [name]: value
        }));
    };

    const onDragEnd = (newProps: any) => {
        console.log('🚀 ~ file: index.tsx ~ line 95 ~ onDragEnd ~ newProps', newProps);

    };

    return (
        <Layout isDashboard>
            <Title level={4}>Issues</Title>
            <Filter filter={filter} onChange={onChangeFilter} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Spin spinning={isLoadingIssues}>
                    <Row gutter={10} className='mt-20'>
                        {Object.keys(categories).map((key) => (
                            <Col key={key} span={8}>
                                <IssueList  title={categories[key].title} id={key} issues={categories[key].issues} />
                            </Col>
                        ))}
                    </Row>
                </Spin>
            </DragDropContext>
        </Layout>
    );
};

export default IssueView;