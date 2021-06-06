// Libraries
import React from 'react';
import {Row, Col, Avatar, Space, Typography} from 'antd';

// Antd
const {Title, Paragraph} = Typography;

interface indexProps {
    
}

const index: React.FC<indexProps> = () => {
    return (
        <Row>
            <Col md={{span: 8}}>
                <Space>
                    <Avatar style={{width: 50, height: 50}} />
                    <div>
                        <Title className='m-0' level={5}>mail@example.com</Title>
                        <Paragraph className='m-0'>ID: 1230129</Paragraph>
                    </div>
                </Space>
            </Col>
            <Col md={{span: 8}}>
                <Space>
                    <img src="/images/logo-chrome.svg" alt="" width={50} />
                    <div>
                        <Title className='m-0' level={5}>mail@example.com</Title>
                        <Paragraph className='m-0'>ID: 1230129</Paragraph>
                    </div>
                </Space>
            </Col>
            <Col md={{span: 8}}>
                <Space>
                    <img src="/images/logo-apple.svg" alt="" width={50} />
                    <div>
                        <Title className='m-0' level={5}>mail@example.com</Title>
                        <Paragraph className='m-0'>ID: 1230129</Paragraph>
                    </div>
                </Space>
            </Col>
        </Row>
    );
};

export default index;