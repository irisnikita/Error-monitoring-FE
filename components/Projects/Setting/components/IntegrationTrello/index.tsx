import React, {useEffect, useMemo, useState} from 'react';
import {Typography, Collapse, Input, Form, Select, message, Row, Button, Col, Spin, Switch} from 'antd';
import {IProject} from 'typings/project';
import {handelError} from 'helpers';

import isEqual from 'lodash/isEqual';

import * as projectServices from 'services/project';

const {Title} = Typography;
const {Panel} = Collapse;
const {Option} = Select;

interface IntegrationProps {
    project: IProject,
    onReload: Function
}

const Integration: React.FC<IntegrationProps> = ({project, onReload}) => {
    const {trelloInfo = {}, enableTrello = false, id: projectId} = project;
    
    // State
    const [isDisabledEnable, setDisabledEnable] = useState(false);
    const [isLoadingSelect, setIsLoadingSelect] = useState(false);
    const [listTrello, setListTrello] = useState([]);
    const [isChanged, setIsChanged] = useState(false);

    // Form
    const [form] = Form.useForm();

    const layout = {
        labelCol: {span: 12},
        wrapperCol: {span: 12}
    };

    useEffect(() => {
      
    }, [form.getFieldsValue(['listId'])]);

    useEffect(() => {
        if (Object.keys(trelloInfo).length) {
            form.setFieldsValue({
                enableTrello: enableTrello,
                appToken: trelloInfo.appToken,
                boardId: trelloInfo.boardId,
                listId: trelloInfo.listId,
                userId: trelloInfo.userId
            });
        }

        getListTrello(trelloInfo.appToken, trelloInfo.userId, trelloInfo.boardId);
    }, [trelloInfo]);

    const getListTrello = async (appToken: any, userId: any, boardId: any) => {
        if (appToken && userId && boardId) {
       
            setIsLoadingSelect(true);
  
            try {
                const {data} = await projectServices.getListBoard({
                    appToken,
                    userId,
                     boardId
                }) as any;

                if (data && data.data) {
                    setListTrello(data.data);
                    setDisabledEnable(false);
                }
            } catch (error) {
                setListTrello([]);
                setDisabledEnable(true);

                form.setFieldsValue({listId: null, enableTrello: false});
            
                message.error('Please fill correct field');
            } finally {
                setIsLoadingSelect(false);
            }
        }
    };

    const onBlurForm = async () => {
        const {appToken, userId, boardId} = form.getFieldsValue(['appToken', 'userId', 'boardId']);

        getListTrello(appToken, userId, boardId);
    };

    const onValuesChange =  () => {
        setIsChanged(  !isEqual({...trelloInfo, enableTrello}, form.getFieldsValue(true)) ? true : false);
    };

    const onClickCancel = () => {
        setListTrello([]);
        getListTrello(trelloInfo.appToken, trelloInfo.userId, trelloInfo.boardId);

        form.resetFields();
        setIsChanged(false);
    };

    const onFinishForm = async (value: any) => {
        try {
            const {data} = await projectServices.update({
                type: 'update-Trello',
                project: {
                    id: projectId,
                    enableTrello: value.enableTrello ,
                    'trelloInfo': {
                        'appToken': value.appToken,
                        'userId': value.userId,
                        'boardId': value.boardId,
                        'listId': value.listId
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
                            {enableTrello: enableTrello,
                                appToken: trelloInfo.appToken,
                                boardId: trelloInfo.boardId,
                                listId: trelloInfo.listId,
                                userId: trelloInfo.userId}
                        }
                        form={form}
                    >
                        <Form.Item 
                            name='appToken'
                            label={<div className='form__label'>App Key</div>}
                            rules={[{required: true, message: 'App Key is required'}]}
                        >
                            <Input onBlur={onBlurForm} placeholder='App key'  size='large'  />
                        </Form.Item> 
                        <Form.Item 
                            name='userId'
                            label={<div className='form__label'>User Token</div>}
                            rules={[{required: true,  message: 'User Token is required'}]}
                        >
                            <Input onBlur={onBlurForm} placeholder='User Token'  size='large'  />
                        </Form.Item> 
                        <Form.Item 
                            name='boardId'
                            label={<div className='form__label'>Board ID</div>}
                            rules={[{required: true,  message: 'Board ID is required'}]}
                        >
                            <Input onBlur={onBlurForm} placeholder='Board ID'  size='large'  />
                        </Form.Item> 
                        <Form.Item
                            name='listId'
                            label={<div className='form__label'>List ID</div>}
                            rules={[{required: true,  message: 'List ID is required'}]}
                        >
                            <Select loading={isLoadingSelect} disabled={!listTrello.length} placeholder='List ID' size='large'>
                                {listTrello && listTrello.length ? listTrello.map((trello: any) => {
                                    return (
                                        <Option  value={trello.id} key={trello.id}>
                                            <span>{trello.name}</span>
                                        </Option>
                                    );
                                }) : null}
                            </Select>
                        </Form.Item> 
                        <Form.Item 
                            name='enableTrello'
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

export default Integration;