import {Col, Row, Menu, Typography} from 'antd';
import React from 'react';
import {MDXRemote} from 'next-mdx-remote';
import {MDXProvider} from '@mdx-js/react';
import {useRouter} from 'next/router';

// Styles
import styles from './styles.module.scss';
import Link from 'next/link';

const {Title} = Typography;

interface DocumentsProps {
    menus: any,
    documentInfo: any,
    documentContent: any
}

const components = {};

const mdxProviderComponents = {
};

const Documents: React.FC<DocumentsProps> = ({menus, documentContent, documentInfo}) => {
    const {query = {}} = useRouter();
    const {slug} = query;

    const {title} = documentInfo;

    const showRenderDocumentMenu = (menus: any) => {
        return menus.map((item: any) => {
            return (
                <Menu.Item key={item.slug}>
                    <Link href={item.slug}>
                        <a>
                            {item.label}
                        </a>
                    </Link>
                </Menu.Item>
            );
        });
    };

    return (
        <Row gutter={[20, 20]} className='h-full' >
            <Col span={5}>
                <Menu
                    className={styles['project__menu']}
                    selectedKeys={[slug as string]}
                    mode='inline'
                >
                    <Menu.ItemGroup key='over-view' title='Overview'>
                        {showRenderDocumentMenu(menus)}
                    </Menu.ItemGroup>
                    
                </Menu>
            </Col>
            <Col span={19} className={styles['project-content--right']}>
                <Row>
                    <Col span={18}>
                        <Title level={3}>{title}</Title>
                        <section className="mdx-wrapper">
                            <MDXProvider components={mdxProviderComponents}>
                                <MDXRemote {...documentContent} components={components} />
                            </MDXProvider>
                        </section>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Documents;