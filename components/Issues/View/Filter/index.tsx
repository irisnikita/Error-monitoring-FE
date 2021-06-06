// Libraries
import React, {useEffect, useState} from 'react';
import {Row, Col} from 'antd';

// Components
import SelectProject from './SelectProject';
import SelectEnvironment from './SelectEnvironment';
import DateRange from './DateRange';
import SelectMember from './SelectMember';

export const defaultFilter = {
    projectId: '',
    environment: '',
    dateRange: [],
    assignee: ''
};

interface FilterProps {
    filter: any,
    onChange: (value: any, name: any) => void
}

const Filter: React.FC<FilterProps> = ({
    filter,
    onChange
}) => {

    return (
        <Row gutter={[10, 10]}>
            <Col md={{span: 8}} xs={{span: 24}}>
                <SelectProject placeholder='Select project' name='projectId' value={filter.projectId} onChange={onChange} />
            </Col>
            <Col md={{span: 8}} xs={{span: 24}}>
                <SelectEnvironment  placeholder='Select environment' name='environment' value={filter.environment} onChange={onChange} />
            </Col>
            <Col md={{span: 8}} xs={{span: 24}}>
                <DateRange name='dateRange' value={filter.dateRange} onChange={onChange} />
            </Col>
            {filter.projectId && (
                <Col span={24}>
                    <SelectMember projectId={filter.projectId}  name='assignee' value={filter.assignee} onChange={onChange} />
                </Col>
            )}
        </Row>
    );
};

export default Filter;