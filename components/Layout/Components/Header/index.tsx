/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {Layout, Menu, Button, Drawer, Tabs, Input} from 'antd';
import classnames from 'classnames';
import {useDispatch, useSelector} from 'react-redux';

// Layout slice
import {
    setEmailRegister,
    selectUser,
    selectTryFree,
    setUser,
    setTryFree
} from 'slice/layoutSlice';

// Styles
import styles from './styles.module.scss';

// Components
import Login from 'components/Login';
import Register from 'components/Register';

// Antd
const {Header: AntdHeader} = Layout;
const {TabPane} = Tabs;

// Type
interface HeaderProps {
    isDashboard: boolean
}

type TMenuList = {
    key: any,
    label: String
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const Header: React.FC<HeaderProps> = ({isDashboard}) => {
    // Variables
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isTryFree = useSelector(selectTryFree);

    // State
    const [headerMenuList] = useState<TMenuList[]>([
        // {key: 'sign-in', label: 'Sign in'},
        // {key: 'sign-up', label: 'Sign up'}
    ]);

    const [isOpenDrawer, setOpenDrawer] = useState(false);

    // Use memo
    const isDisplayAbsolute = useMemo(() => {
        return ['/', 'forgot-password'].includes(router.route) ? true : false;
    }, []);

    useEffect(() => {
        if (isTryFree && router.route === '/') {
            setOpenDrawer(true);
        }
    }, [isTryFree]);

    const callbackRegister  = (email: string) => {
        setTabKeySelected('login');

        setTimeout(() => {
            dispatch(setEmailRegister(email));
        }, 1000);
    };

    const [drawerTabs] = useState([
        {key: 'login', label: 'Login', component: <Login />},
        {key: 'register', label: 'Register', component: <Register callbackRegister={callbackRegister} />}
    ]);
    const [tabKeySelected, setTabKeySelected] = useState(drawerTabs[0].key);

    const onCloseDrawer = () => {
        setOpenDrawer(false);
        dispatch(setTryFree(false));
    };

    const onClickTryFree = () => {
        setOpenDrawer(true);
    };

    const onChangeTabs = (key: string) => {
        setTabKeySelected(key);
    };

    const onClickLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('filter-issue');
        localStorage.removeItem('filter-suite');
        
        dispatch(setUser({}));
        router.push('/');
    };

    return ( 
        <>
            <AntdHeader className={classnames({
                [styles['header']]: true,
                [styles['absolute']]: isDisplayAbsolute
            })}>
                <div className={classnames('container flex a-c j-b', {
                    'no-space': isDashboard
                })}>
                    {isDashboard ? (
                        <Input.Search placeholder='Input to search' size='large' style={{width: 300}} />
                    ) : (
                        <>
                            <div className={styles['logo']}>
                                <img src="/images/logo/logo-hvh.png" width="60" alt="Hvh error monitoring tracking" />
                            </div>
                        </>
                    )}
                    <div className="flex a-c">
                        <Menu theme="light" mode="horizontal" className={styles['right-menu']}>
                            {headerMenuList && headerMenuList.length ? headerMenuList.map(menuItem => {
                                return (
                                    <Menu.Item key={menuItem.key}>{menuItem.label}</Menu.Item>
                                );
                            }) : null}
                            <Menu.Item />
                        </Menu>
                        {!Object.keys(user).length ? (
                            <Button type='primary' shape='round' size='large' onClick={onClickTryFree}>Try free</Button>
                        ) : <Button type='primary' danger shape='round' size='large' onClick={onClickLogout}>Log out</Button>}
                    </div>
                </div>
            </AntdHeader>
            <Drawer
                title={
                    <div className="flex a-c">
                        <img width='60' height='auto' src="images/logo/logo-hvh.png" alt="Hvh error monitoring" />
                    </div>
                }
                placement="right"
                width={400}
                closable={false}
                onClose={onCloseDrawer}
                visible={isOpenDrawer}
            >
                <Tabs activeKey={tabKeySelected} onChange={onChangeTabs} >
                    {drawerTabs.length ? drawerTabs.map(tab => {
                        return (
                            <TabPane key={tab.key} tab={tab.label}>
                                {tab.component}
                            </TabPane>
                        );
                    }) : null}
                </Tabs>
            </Drawer>
        </>

    );
};

export default Header;