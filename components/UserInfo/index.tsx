/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React from 'react';
import {useRouter} from 'next/router';
import {Avatar, Typography, Dropdown, Menu} from 'antd';
import classnames from 'classnames';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';

// Redux toolkit
import {selectUser, setUser} from 'slice/layoutSlice';

// Utils
import {formatNameToAvatar} from 'utils';

// Styles
import styles from './styles.module.scss';

interface UserInfoProps {
    
}

const UserInfo: React.FC<UserInfoProps> = () => {
    const router = useRouter();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const {avatar, organization, email, fullName} = user;

    const onClickLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('filter-issue');
        localStorage.removeItem('filter-suite');
        
        dispatch(setUser({}));
        router.push('/');
    };

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
            <Menu.Item onClick={onClickLogout}>Sign out</Menu.Item>
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