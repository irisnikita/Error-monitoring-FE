// Libraries
import React, {useMemo, useState} from 'react';
import {Space, Row, Col, Typography, Radio} from 'antd';

// Components
import JsonView from 'components/Issues/common/JsonView'; 

// Antd
const {Title} = Typography;

interface SectionAdditionalDataProps {
    detail: any,   
}

const options = ['Json', 'Raw'];

const SectionAdditionalData: React.FC<SectionAdditionalDataProps> = ({
    detail
}) => {
    const [option, setOption] = useState('Json');

    const onChangeOptions = (e: any) => {
        setOption(e.target.value);
    };

    const showRenderContent = () => {
        switch (option) {
            case 'Json':
                
                return <JsonView 
                    src={detail}
                />;
        
            case 'Raw':
                return <Space className='w-full' direction='vertical'>
                    {Object.keys(detail).length && Object.keys(detail).map(key => (
                        <Row key={key}>
                            <Col md={{span: 4}}>
                                <Space className='flex h-full a-c'>
                                    {key}
                                </Space>
                            </Col>
                            <Col md={{span: 20}} className='__detail-value'>{detail[key]}</Col>
                        </Row>
                    ))}
                </Space>;
        }
    };

    return (
        <div>
            <Space className='w-full' style={{justifyContent: 'space-between'}}>
                <Title level={5}>ADDITIONAL DATA</Title>
                <Radio.Group
                    options={options}
                    onChange={onChangeOptions}
                    value={option}
                    buttonStyle="solid"
                    optionType="button"
                />
            </Space>
            <div className='mt-10'>
                {showRenderContent()}
            </div>
        </div>
    );
};

export default SectionAdditionalData;