// Libraries
import React, {useEffect, useState} from 'react';
import {Empty, Space, Spin, Typography} from 'antd';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

// Services
import * as filterServices from 'services/filter';

// Components
import Layout from 'components/Layout';
import SuiteItem from 'components/Automation/View/SuiteItem';
import Filter, {defaultFilter} from 'components/Automation/View/Filter';

// Constants
import {FILTER_SUITE} from 'constants/localStorage';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Helpers
import {handelError} from 'helpers';

// Antd
const {Title} = Typography;

interface AutomationProps {
    
}

const Automation: React.FC<AutomationProps> = () => {
    // State
    const [suites, setSuites] = useState<any[]>([]);
    const [isLoadingSuites, setLoadingSuites] = useState(false);
    const [filter, setFilter] = useState(defaultFilter);
    const previousFilter = usePrevious(filter);
    
    useEffect(() => {
        if (localStorage.getItem(FILTER_SUITE)) {
            const newFilter: any = JSON.parse((localStorage.getItem(FILTER_SUITE) as any));

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
            getSuites();
        }
    }, [filter]);
    
    const getSuites = async () => {
        setLoadingSuites(true);
        try {
            const params = {
                projectId: filter.projectId,
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
                    type: 'suite'
                },
                ...params
            });

            if (response && response.data) {
                const {data} = response.data;

                setSuites(data);
            }
        } catch (error) {
            handelError();
        } finally {
            setLoadingSuites(false);
        }
    };

    const onChangeFilter = (value: any, name: any) => {
        setFilter({
            ...filter,
            [name]: value
        });

        localStorage.setItem(FILTER_SUITE, JSON.stringify({
            ...filter,
            [name]: value
        }));
    };

    return (
        <Layout isDashboard>
            <Title level={4}>Automation</Title>
            <Filter filter={filter} onChange={onChangeFilter} />
            <Spin spinning={isLoadingSuites}>
                <Space className='w-full mt-20' size={10} direction='vertical'>
                    {suites && suites.length ? suites.map(suite => (
                        <SuiteItem key={suite.id} suite={suite} projectId={filter.projectId} />
                    )) : <Empty />}
                </Space>
            </Spin>
        </Layout>
    );
};

export default Automation;