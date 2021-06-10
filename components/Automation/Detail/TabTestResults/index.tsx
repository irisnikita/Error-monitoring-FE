// Libraries
import React from 'react';
import {Collapse, Empty, Space, Typography} from 'antd';
import moment from 'moment';
import {parseJson} from 'helpers';

// Constants
import {getTestIcon} from 'constants/suites';

// Components
// import SuiteItem from 'components/Automation/Detail/SuiteItem';

interface TabTestResultsProps {
    suite: any,
}

const {Title} = Typography;

const {Panel} = Collapse;

const TabTestResults: React.FC<TabTestResultsProps> = ({
    suite = {}
}) => {
    // Suite
    const {
        osName,
        osVersion,
        browserName,
        browserVersion
    } = suite;

    const runs: any = parseJson(suite.runs);

    return (
        <div className='mb-20'>
            <Collapse>
                {runs && runs.length ? runs.map((run: any,index: any) => {
                    const {
                        spec,
                        stats = {},
                        tests = []
                    } = run;

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
                                    •
                                    <Space>
                                        <i className='icon-hvh-display' />
                                        <span className='text-capitalize'>
                                            {osName} {osVersion}
                                        </span>
                                    </Space>
                                    •
                                    <Space>
                                        <img src="/images/icon/electron_browser.png" width={20} alt="" />
                                        <span className='text-capitalize'>
                                            {browserName} {browserVersion}
                                        </span>
                                    </Space>
                                </Space>
                            </div>
                        }>
                            {tests && tests.length ? tests.map((test: any, index: number) => {
                                const {title = []} = test;

                                return (
                                    <div className='flex a-c j-b p-10' key={index}>
                                        <Space align='center'>
                                            {getTestIcon(test.state)}
                                            {(title as any[]).map((t, index) => <Space key={index}>
                                                {t}
                                                {index !== title.length - 1 ? <i className='icon-hvh-arrow-right' /> : null}
                                            </Space>)}
                                        </Space>
                                    </div>
                                );
                            }) : null}
                        </Panel>
                    );
                }) : null}
            </Collapse>
        </div>
    );
};

export default TabTestResults;