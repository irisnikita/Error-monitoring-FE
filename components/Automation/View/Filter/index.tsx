// Libraries
import React, {useEffect, useState} from 'react';
import {Row, Col} from 'antd';

// Components
import SelectProject from 'components/Issues/View/Filter/SelectProject';
import SelectEnvironment from 'components/Issues/View/Filter/SelectEnvironment';
import DateRange from 'components/Issues/View/Filter/DateRange';
import SelectMember from 'components/Issues/View/Filter/SelectMember';

// Constants
import {FILTER_SUITE} from 'constants/localStorage';

export const defaultFilter = {
    projectId: '',
    environment: '',
    dateRange: []
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
                <SelectProject keyLocalFilter={FILTER_SUITE} placeholder='Select project' name='projectId' value={filter.projectId} onChange={onChange} />
            </Col>
            <Col md={{span: 8}} xs={{span: 24}}>
                <SelectEnvironment  placeholder='Select environment' name='environment' value={filter.environment} onChange={onChange} />
            </Col>
            <Col md={{span: 8}} xs={{span: 24}}>
                <DateRange name='dateRange' value={filter.dateRange} onChange={onChange} />
            </Col>
        </Row>
    );
};

export default Filter;