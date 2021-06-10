// Libraries
import React from 'react';
import {Collapse, Empty, Space, Typography} from 'antd';
import moment from 'moment';

// Components
// import SuiteItem from 'components/Automation/Detail/SuiteItem';

interface TabTestResultsProps {
    runs: any[]
}

const {Title} = Typography;

const {Panel} = Collapse;

const TabTestResults: React.FC<TabTestResultsProps> = ({
    runs
}) => {

    return (
        <div className='mb-20'>
            <Collapse>
                {runs && runs.length ? runs.map((suite,index) => {
                    const {
                        spec,
                        stats = {}
                    } = suite;

                    return ( 
                        <Panel showArrow={false} key={`suite-${index}`} header={
                            <div>
                                <div className='flex a-c'>
                                    <i className='icon-hvh-file-text mr-5' />
                                    <Title level={5} className='m-0'>{spec.name}</Title>                            
                                </div>
                                <Space size={15} className='mt-5'>
                                    {stats.skipped ?  ( <Space size={5}>
                                        <i className='icon-hvh-blocked' />
                                        {stats.skipped}                        
                                    </Space>) : null}
                                    {stats.pending ? (<Space size={5}>
                                        <i className='icon-hvh-loop2' />
                                        {stats.pending}                        
                                    </Space>) : null}
                                    {stats.passes ?  (<Space size={5}>
                                        <i style={{color: '#389e0d'}} className='icon-hvh-checkmark' />
                                        {stats.passes}                        
                                    </Space>) : null}
                                    {stats.failures ? (<Space size={5}>
                                        <i style={{color: '#cf1322'}} className='icon-hvh-cancel-circle' />
                                        {stats.failures}                        
                                    </Space>) : null}
                                    •
                                    <Space>
                                        <i className='icon-hvh-hour-glass' />
                                        <span>{stats.duration >= 1000 ? moment.utc(stats.duration).format('mm:ss') : `${stats.duration}ms`}</span>
                                    </Space>
                                </Space>
                            </div>
                        }>
                            Hello 
                        </Panel>
                    );
                }) : null}
            </Collapse>
        </div>
    );
};

export default TabTestResults;