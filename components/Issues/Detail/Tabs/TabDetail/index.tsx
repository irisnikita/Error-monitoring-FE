// Libraries
import React, {useMemo} from 'react';
import {Col, Divider, Row, Typography} from 'antd';

// Components
import SectionInfo from './SectionInfo';
import SectionAdditionalData from './SectionAdditionalData';

const {Title, Paragraph} = Typography;

interface TabDetailProps {
    issue: any
}

const TabDetail: React.FC<TabDetailProps> = ({
    issue
}) => {
    const {
        description,
        frame,
        detail = ''
    } = issue;

    const stack = useMemo(() => {
        return frame ? JSON.parse(frame).stack : '';
    }, [frame]);

    return (
        <Row>
            <Col md={{span: 18}}>
                <SectionInfo />
                <Divider />
                <div>
                    <Title level={5}>MESSAGE</Title>
                    <Paragraph className='text-capitalize'>{description}</Paragraph>
                </div>
                <Divider />
                <div>
                    <Title level={5}>EXCEPTION</Title>
                    <Paragraph>
                        <pre>{stack}</pre>
                    </Paragraph>
                </div>
                <Divider />
                <SectionAdditionalData detail={detail !== '' ? JSON.parse(detail) : {}} />
            </Col>
            <Col md={{span: 6}} />
        </Row>
    );
};

export default TabDetail;