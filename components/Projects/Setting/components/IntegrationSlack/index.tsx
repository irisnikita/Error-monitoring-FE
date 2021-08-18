import React, {useEffect, useMemo, useState} from 'react';
import {Typography, Collapse, Input, Form, Select, message, Row, Button, Col, Spin, Switch} from 'antd';
import {IProject} from 'typings/project';
import {handelError} from 'helpers';

import isEqual from 'lodash/isEqual';

import * as projectServices from 'services/project';

const {Title} = Typography;
const {Panel} = Collapse;
const {Option} = Select;

interface IntegrationSlackProps {
    project: IProject,
    onReload: Function
}

const IntegrationSlack: React.FC<IntegrationSlackProps> = ({project, onReload}) => {
    const {slackInfo = {},  enableSlack = false, id: projectId} = project;
    
    // State
    const [isDisabledEnable, setDisabledEnable] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    // Form
    const [form] = Form.useForm();

    const layout = {
        labelCol: {span: 12},
        wrapperCol: {span: 12}
    };

    useEffect(() => {
        if (Object.keys(slackInfo).length) {
            form.setFieldsValue({
                enableSlack,
                botToken: slackInfo.botToken,
                chanelId: slackInfo.chanelId
            });
        }

        setDisabledEnable(slackInfo.botToken && slackInfo.chanelId ? false : true);
    }, [slackInfo]);

    const onValuesChange =  () => {
        const {botToken, chanelId} = form.getFieldsValue(['botToken', 'chanelId']);

        setDisabledEnable(botToken && chanelId ? false : true);

        setIsChanged(!isEqual({...slackInfo, enableSlack}, form.getFieldsValue(true)) ? true : false);
    };

    const onClickCancel = () => {

        form.resetFields();
        setIsChanged(false);
    };

    const onFinishForm = async (value: any) => {
        try {
            const {data} = await projectServices.update({
                type: 'update-Slack',
                project: {
                    id: projectId,
                    enableSlack: value.enableSlack ,
                    'slackInfo': {
                        'botToken': value.botToken,
                        'chanelId': value.chanelId
                    }
                }
            }) as any;

            if (data) {
                setIsChanged(false);
                onReload();
                message.success('Update config trello success');
            }
        } catch (error) {
            handelError();
        } 
    };

    return (
        <div>
            <Title level={4}>Integration trello</Title>
            <Collapse defaultActiveKey={['config']} collapsible='header'>
                <Panel  showArrow={false} header="Config" key="config">
                    <Form
                        name='form-update-info'
                        {...layout}
                        labelAlign='left'
                        onFinish={onFinishForm}
                        onValuesChange={onValuesChange}
                        initialValues={
                            {enableSlack: enableSlack,
                                botToken: slackInfo.botToken,
                                chanelId: slackInfo.chanelId
                            }
                        }
                        form={form}
                    >
                        <Form.Item 
                            name='botToken'
                            label={<div className='form__label'>App Bot Token</div>}
                            rules={[{required: true, message: 'App Bot Token is required'}]}
                        >
                            <Input  placeholder='App Bot Token'  size='large'  />
                        </Form.Item> 
                        <Form.Item 
                            name='chanelId'
                            label={<div className='form__label'>Chanel ID</div>}
                            rules={[{required: true,  message: 'Chanel ID is required'}]}
                        >
                            <Input  placeholder='Chanel ID'  size='large'  />
                        </Form.Item> 
                        <Form.Item 
                            name='enableSlack'
                            label={<div style={{marginLeft: 10}} className='form__label'>Enable</div>}
                            valuePropName="checked"
                        >
                            <Switch disabled={isDisabledEnable} />
                        </Form.Item>
                        <Form.Item labelCol={{span: 0}} wrapperCol={{span: 24}} >
                            <Row gutter={10} style={{justifyContent: 'flex-end'}}>
                                <Col><Button disabled={!isChanged} danger onClick={onClickCancel}>Cancel</Button></Col>
                                <Col><Button disabled={!isChanged} type='primary' htmlType='submit'>Save</Button></Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Panel>
            </Collapse>
        </div>
    );
};

export default IntegrationSlack;