import React, {useEffect, useMemo, useState} from 'react';
import {Typography, Collapse, Input, Form, Select, message, Row, Button, Col, Spin, Switch} from 'antd';
import {IProject} from 'typings/project';
import {handelError} from 'helpers';

import isEqual from 'lodash/isEqual';

import * as projectServices from 'services/project';

const {Title} = Typography;
const {Panel} = Collapse;
const {Option} = Select;

interface IssuesSettingProps {
    project: IProject,
    onReload: Function
}

const IssuesSetting: React.FC<IssuesSettingProps> = ({project, onReload}) => {
    const {id: projectId, autoSuggestPerson = true, autoSuggestSolution = false} = project;
    
    // State
    const [isLoading, setIsLoading] = useState(false);

    // Form
    const [form] = Form.useForm();

    const layout = {
        labelCol: {span: 12},
        wrapperCol: {span: 12}
    };

    useEffect(() => {
        form.setFieldsValue({
            autoSuggestPerson,
            autoSuggestSolution
        });

    }, [autoSuggestPerson, autoSuggestSolution]);

    const onValuesChange = async (_: any, values: any) => {
        try {
            setIsLoading(true);
            const {data} = await projectServices.update({
                type: 'update-Auto-Suggest',
                project: {
                    id: projectId,
                    ...values
                }
            }) as any;

            if (data) {
                onReload();
                message.success('Update config issues success');
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
                            {autoSuggestPerson,
                                autoSuggestSolution
                            }}
                        form={form}
                    >
                        {/* <Form.Item 
                            name='autoSuggestSolution'
                            label={<div style={{marginLeft: 10}} className='form__label'>Auto suggest solution</div>}
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item> */}
                        <Form.Item 
                            name='autoSuggestPerson'
                            label={<div style={{marginLeft: 10}} className='form__label'>Auto suggest assignee</div>}
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

export default IssuesSetting;