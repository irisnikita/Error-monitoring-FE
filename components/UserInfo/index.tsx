/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React from 'react';
import {Avatar, Typography, Dropdown, Menu} from 'antd';
import  {useSelector} from 'react-redux';
import classnames from 'classnames';
import Link from 'next/link';

// Redux toolkit
import {selectUser} from 'slice/layoutSlice';

// Utils
import {formatNameToAvatar} from 'utils';

// Styles
import styles from './styles.module.scss';

interface UserInfoProps {
    
}

const UserInfo: React.FC<UserInfoProps> = () => {
    const user = useSelector(selectUser);

    const {avatar, organization, email, fullName} = user;

    const menu = () => (
        <Menu>
            <div className={classnames('flex a-c p-10', styles['user__dropdown-item'])}>
                <Avatar shape='square' style={{backgroundColor: '#531dab'}} size='default' src={avatar}>{formatNameToAvatar(fullName)}</Avatar>
                <div className='ml-10'>
                    <strong className={styles['__title']}>{fullName}</strong> <br />
                    <span className={styles['__email']}>{email}</span>
                </div>
            </div>
            <Menu.Item>
                <Link href='/dashboard/user'>
                User settings
                </Link>
            </Menu.Item>
            <Menu.Item>API keys</Menu.Item>
            <Menu.Item>Sign out</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}  trigger={['click']}>
            <div className={classnames('flex a-c', styles['user-info'])}>
                <Avatar style={{backgroundColor: '#08979c'}} size='large'>{formatNameToAvatar(organization)}</Avatar>
                <div className={classnames(styles['__content'], 'ml-10')}>
                    <strong className={styles['__title']}>{organization}</strong> <br />
                    <span className={styles['__email']}>{email}</span>
                </div>
            </div>
        
        </Dropdown>
    );
};

export default UserInfo;