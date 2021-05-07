/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useEffect, useMemo, useState} from 'react';
import {Layout, Menu, Spin} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import UserInfo from 'components/UserInfo';

// Services
import * as userServices from 'services/user';

// User hooks
import useMounted from 'hooks/useMounted';

// Redux toolkit
import {selectUser, setUser} from 'slice/layoutSlice';

// Styles
import styles from './styles.module.scss';

// Components
import Header from './Components/Header';

// Ant design
const {Content, Sider} = Layout;

// Type
interface DefaultLayoutProps {
    isDashboard?: boolean
}

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */
const DefaultLayout: React.FC<DefaultLayoutProps> = ({children, isDashboard = false}) => {
    // Router
    const router = useRouter();
    const {route} = router;
    const mounted = useMounted();

    const [isPreloadPage, setPreloadPage] = useState(true);
    const [menu] = useState([
        {key: 'projects', label: 'Projects', router: '/dashboard/projects', icon: <i className='icon-hvh-folder' />},
        {key: 'issues', label: 'Issues', router: '/dashboard/issues', icon: <i className='icon-hvh-stack' />},
        {key: 'alerts', label: 'Alerts', router: '/dashboard/alerts', icon: <i className='icon-hvh-bell' />},
        {key: 'stats', label: 'Stats', router: '/dashboard/stats', icon: <i className='icon-hvh-stats-bars' />}
    ]);

    // Redux
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            validateUser();
        } else {
            router.push('/');
        }

        setTimeout(() => {
            if (mounted.current) {
                setPreloadPage(false);
            }
        }, 500);
    }, []);

    const keySelected: any = useMemo(() => {
        return menu.find(item => item.router === route) ? menu.find(item => item.router === route)?.key : '';
    }, [route]);

    const validateUser = async () => {
        const validateResponse = await userServices.get();

        if (validateResponse && validateResponse.data) {
            const {data, status} = validateResponse.data;

            if (status) {
                dispatch(setUser({...data}));

                if (router.route === '/') {
                    router.push('/dashboard');
                }
            } else {
                router.push('/');
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                }
            }
        }
    };

    return (
        <div>
            <div className={`preload-page ${!isPreloadPage ? 'hide' : null}`}  >
                <Spin />
            </div>
            <Layout>
                {isDashboard ? (
                    <Sider width={250} className={styles['default-sider']} >
                        <UserInfo />
                        <Menu
                            theme='dark'
                            mode="inline"
                            defaultSelectedKeys={[keySelected]}
                            style={{borderRight: 0}}
                        >
                            {menu && menu.length ? menu.map(item => {
                                return (
                                    <Menu.Item icon={item.icon} key={item.key}>
                                        <Link href={item.router}>
                                            {item.label}
                                        </Link>
                                    </Menu.Item>
                                );
                            }) : null}
                        </Menu>
                    </Sider>
                ) : null}
                <Layout>
                    <Header isDashboard={isDashboard} />
                    <Content className={classnames({
                        [styles['default-content']]: isDashboard
                    })}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default DefaultLayout;