/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {Layout, Menu, Button, Drawer, Tabs} from 'antd';
import classnames from 'classnames';

// Styles
import styles from './styles.module.scss';

// Components
import Login from 'Components/Login';

// Antd
const {Header: AntdHeader} = Layout;
const {TabPane} = Tabs;

// Type
interface HeaderProps {
    
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const Header: React.FC<HeaderProps> = () => {
    // Variables
    const {route} = useRouter();

    // State
    const [headerMenuList] = useState([
        {key: 'sign-in', label: 'Sign in'},
        {key: 'sign-up', label: 'Sign up'}
    ]);
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [drawerTabs] = useState([
        {key: 'login', label: 'Login', component: <Login />},
        {key: 'register', label: 'Register', component: <div>wefwe</div>}
    ]);

    // Use memo
    const isDisplayAbsolute = useMemo(() => {
        return ['/', 'forgot-password'].includes(route) ? true : false;
    }, []);

    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const onClickTryFree = () => {
        setOpenDrawer(true);
    };

    return ( 
        <>
            <AntdHeader className={classnames({
                [styles['header']]: true,
                [styles['absolute']]: isDisplayAbsolute
            })}>
                <div className="container flex a-c j-b">
                    <div className={styles['logo']}>
                        <img src="./images/logo/logo-hvh.png" width="150" alt="Hvh error monitoring tracking" />
                    </div>
                    <div className="flex a-c">
                        <Menu theme="light" mode="horizontal" className={styles['right-menu']}>
                            {headerMenuList.length ? headerMenuList.map(menuItem => {
                                return (
                                    <Menu.Item key={menuItem.key}>{menuItem.label}</Menu.Item>
                                );
                            }) : null}
                            <Menu.Item />
                        </Menu>
                        <Button type='primary' shape='round' size='large' onClick={onClickTryFree}>Try free</Button>
                    </div>
                </div>
            </AntdHeader>
            <Drawer
                title={<h2>Welcome to Error monitoring</h2>}
                placement="right"
                width={400}
                closable={false}
                onClose={onCloseDrawer}
                visible={isOpenDrawer}
            >
                <Tabs >
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