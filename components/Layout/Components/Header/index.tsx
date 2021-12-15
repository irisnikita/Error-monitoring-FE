/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {Layout, Menu, Button, Drawer, Tabs, Input, Dropdown, Typography, Tag} from 'antd';
import classnames from 'classnames';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import algoliasearch from 'algoliasearch';
import Highlighter from 'react-highlight-words';

// Hooks
import useDebounce from 'hooks/useDebounce'; 

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
const {Title} = Typography;
const {TabPane} = Tabs;

// Services
import * as projectService from 'services/project';
import {handelError} from 'helpers';
import {Divider} from 'rc-menu';

// Type
interface HeaderProps {
    isDashboard: boolean
}

type TMenuList = {
    key: any,
    label: String
}

const client = algoliasearch('WBPP8V3IK6', '1d0d339d437210d2c910e7c4e19104c2');
const index = client.initIndex('dev_issues');

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
    const [searchValue, setSearchValue] = useState('');
    const [searchState, setSearchState] = useState({
        hits: []
    });
    const [projects, setProjects] = useState<any[]>([]);
    const [isOpenSearchDropdown, setOpenSearchDropdown] = useState(false);
    const [isOpenDrawer, setOpenDrawer] = useState(false);

    // Use debounce
    const debounceSearchValue = useDebounce(searchValue, 400);

    // Use memo
    const isDisplayAbsolute = useMemo(() => {
        return ['/', 'forgot-password'].includes(router.route) ? true : false;
    }, []);

    useEffect(() => {
        getIssues();
    }, [debounceSearchValue]);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        try {
            const response = await projectService.get();
            
            if (response && response.data) {
                const {data} = response.data;

                setProjects(data);
            }
        } catch (error) {
            handelError();
        }
    };

    useEffect(() => {
        if (isTryFree && router.route === '/') {
            setOpenDrawer(true);
        }
    }, [isTryFree]);

    const getIssues = async () => {
        let filterOr: string[] = [];

        if (projects && projects.length) {
            filterOr = projects.map(project => `projectId:${project.id}`);
        }

        if (debounceSearchValue !== '') {
            index.search(debounceSearchValue, {
                hitsPerPage: 5,
                page: 0,
                facetFilters: [filterOr]
            }).then((data) => {
                setSearchState({
                    ...searchState,
                    hits: data.hits as any
                });
                setOpenSearchDropdown(true);
            });
        } else {
            setSearchState({
                ...searchState,
                hits: []
            });
        }
    };

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

    const onChangeSearch = (e: any) => {
        setSearchValue(e.target.value);
    };
    
    const menuSearch = (
        <Menu>
            <div>
                <Title level={5} style={{padding: '5px 10px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Issues</Title>
            </div>
            {searchState.hits && searchState.hits.length ? searchState.hits.map((hit: any, index) => {
                return (
                    <Menu.Item key={index}>
                        <Link href={`/dashboard/issues/${hit.projectId}/${hit.id}`}>
                            <div className={styles['hit-row']}>
                                <div className={styles['hit__project-name']}>
                                    <Highlighter
                                        highlightClassName={styles['text-highlight']}
                                        searchWords={debounceSearchValue.split(' ')}
                                        autoEscape={true}
                                        textToHighlight={hit.projectName}
                                    />
                                </div>
                                <div className={styles['hit__issue-info']}>
                                    <strong>
                                        <Highlighter
                                            highlightClassName={styles['text-highlight']}
                                            searchWords={debounceSearchValue.split(' ')}
                                            autoEscape={true}
                                            textToHighlight={hit.name}
                                        />
                                    </strong>
                                    <div>
                                        <Highlighter
                                            highlightClassName={styles['text-highlight']}
                                            searchWords={debounceSearchValue.split(' ')}
                                            autoEscape={true}
                                            textToHighlight={hit.description}
                                        />
                                    </div>
                                    <Tag color="default">
                                        <Highlighter
                                            highlightClassName={styles['text-highlight']}
                                            searchWords={debounceSearchValue.split(' ')}
                                            autoEscape={true}
                                            textToHighlight={hit.environment}
                                        />
                                    </Tag>
                                </div>
                            </div>
                        </Link>
                    </Menu.Item>
                );
            }) : <div style={{padding: 10}}>No issues founded</div>}
        </Menu>
    );

    const onVisibleChange = () => {
        setOpenSearchDropdown(!isOpenSearchDropdown);
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
                        <Dropdown overlay={menuSearch} trigger={['click']} visible={isOpenSearchDropdown} onVisibleChange={onVisibleChange}>
                            <Input.Search placeholder='Input to search' size='large' style={{width: 300}} onChange={onChangeSearch} />
                        </Dropdown>
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