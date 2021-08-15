// Libraries
import React, {useState} from 'react';
import {Row, Col, Menu, Spin} from 'antd';

// Styles
import styles from './styles.module.scss';

// Components
import Layout from 'components/Layout';
import AccountDetails from './components/AccountDetails';

interface UserSettingProps {
  
}

type projectItem = {
    key: string,
    label: string,
    child?: Array<{key: string, label: string}>
}

const UserSetting: React.FC<UserSettingProps> = () => {
    // state
    const [isLoading, setLoading] = useState(false);

    const userMenu: Array<projectItem> = [{
        key: 'account', label: 'Account', child: [
            {
                key: 'account-details', label: 'Account details'
            }
        ]
    }];

    const [currentTab, setCurrentTab] = useState('account-details');

    const showRenderUserMenu = (menu: Array<projectItem>) => {
        return menu.map(item => {
            if (item.child) {
                return  <Menu.ItemGroup key={item.key} title={item.label}>
                    {showRenderUserMenu(item.child)}
                </Menu.ItemGroup>;
            } else {
                return (
                    <Menu.Item key={item.key}>{item.label}</Menu.Item>
                );
            }
        });
    };

    const onClickMenuItem = (value: any) => {
        setCurrentTab(value.key);
    };

    const showRenderContent = () => {
        switch (currentTab) {
            case 'general-setting':
                return <AccountDetails />;
     
            default:
                return <AccountDetails  />;
        }
    };

    return (
        <Layout isDashboard>
            <Row gutter={[20, 20]} className='h-full' >
                <Col span={5}>
                    <Menu
                        onClick={onClickMenuItem}
                        className={styles['project__menu']}
                        selectedKeys={[currentTab]}
                        mode='inline'
                    >
                        {showRenderUserMenu(userMenu)}
                    </Menu>
                </Col>
                <Col span={19} className={styles['project-content--right']}>
                    <Spin spinning={isLoading}>
                        {showRenderContent()}
                    </Spin>
                </Col>
            </Row>
        </Layout>
    );
};

export default UserSetting;