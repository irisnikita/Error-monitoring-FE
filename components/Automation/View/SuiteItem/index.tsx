// Libraries
import {Space, Typography, Avatar} from 'antd';
import React from 'react';
import {parseJson} from 'helpers';
import moment from 'moment';
import Link from 'next/link';

// Styles
import styles from './styles.module.scss';

// Antd
const {Title} = Typography;

interface SuiteItemProps {
    suite: any,
    projectId: any
}

const SuiteItem: React.FC<SuiteItemProps> = ({
    suite,
    projectId
}) => {
    // Suite
    const {
        id,
        branchInfo = '{}',
        startedTestsAt = '',
        totalDuration = '',
        totalSkipped,
        totalPending,
        totalPassed,
        totalFailed
    } = suite;

    // Branch 
    const {
        branch,
        message,
        email,
        author,
        sha,
        timestamp,
        remote
    } = parseJson(branchInfo);

    const colorIssue: any = () => {
        return totalFailed === 0 ? '#389e0d' : '#cf1322';
    };

    return (
        <Link href={`/dashboard/automation/${projectId}/${id}`}>
            <div className={styles['suite-item']} style={{borderLeftColor: colorIssue()}}>
                <div className='flex j-b'>
                    <div>
                        <Title level={5} className='m-0'>
                            {message}
                        </Title>
                        <Space className='mt-10'>
                            <Space>
                                <Avatar size='small' />
                                {author}
                            </Space>
                        •
                            <Space>
                                <i className='icon-hvh-clock' />
                                <span>Ran {moment(startedTestsAt).fromNow()}</span>
                            </Space>
                        •
                            <Space>
                                <i className='icon-hvh-hour-glass' />
                                <span>{moment.utc(totalDuration).format('HH:mm:ss')}</span>
                            </Space>
                        •
                            <Space>
                                <i className='icon-hvh-git' />
                                {branch}
                            </Space>
                        </Space>
                    </div>
                    <Space size={15}>
                        <Space size={5}>
                            <i className='icon-hvh-blocked' />
                            {totalSkipped}                        
                        </Space>
                        <Space size={5}>
                            <i className='icon-hvh-loop2' />
                            {totalPending}                        
                        </Space>
                        <Space size={5}>
                            <i style={{color: '#389e0d'}} className='icon-hvh-checkmark' />
                            {totalPassed}                        
                        </Space>
                        <Space size={5}>
                            <i style={{color: '#cf1322'}} className='icon-hvh-cancel-circle' />
                            {totalFailed}                        
                        </Space>
                    </Space>
                </div>
            </div>
        </Link>
    );
};

export default SuiteItem;