import React, {useState} from 'react';
import {Typography, Collapse, Form,  message, Spin, Switch} from 'antd';
import {IProject} from 'typings/project';
import {handelError} from 'helpers';

import * as projectServices from 'services/project';

const {Title} = Typography;
const {Panel} = Collapse;

interface NotificationProps {
    project: IProject,
    onReload: Function
}

const Notification: React.FC<NotificationProps> = ({project, onReload}) => {
    const {id: projectId, enableMailNotification = false} = project;
    
    // State
    const [isLoading, setIsLoading] = useState(false);

    // Form
    const [form] = Form.useForm();

    const layout = {
        labelCol: {span: 12},
        wrapperCol: {span: 12}
    };

    const onValuesChange = async (_: any, values: any) => {
        try {
            setIsLoading(true);
            const {data} = await projectServices.update({
                type: 'update-Mail-Notification',
                project: {
                    id: projectId,
                    ...values
                }
            }) as any;

            if (data) {
                onReload();
                message.success('Update config notification success');
            }
        } catch (error) {
            handelError();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Spin spinning={isLoading}>
            <Title level={4}>Issues Setting</Title>
            <Collapse defaultActiveKey={['config']} collapsible='header'>
                <Panel  showArrow={false} header="Config" key="config">
                    <Form
                        name='form-update-info'
                        {...layout}
                        labelAlign='left'
                        onValuesChange={onValuesChange}
                        initialValues={
                            {enableMailNotification
                            }}
                        form={form}
                    >
                        <Form.Item 
                            name='enableMailNotification'
                            label={<div style={{marginLeft: 10}} className='form__label'>Email notification</div>}
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Form>
                </Panel>
            </Collapse>
        </Spin>
    );
};

export default Notification;