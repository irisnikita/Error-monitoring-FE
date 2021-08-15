/* -------------------------------------------------------------------------- */
/*                                   Heading                                  */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useEffect, useState} from 'react';
import {Form, Collapse, Typography, Row, Col, Button, Spin, notification, Select, Input, Tooltip} from 'antd';
import {useSelector} from 'react-redux';

// Redux toolkit
import {selectUser} from 'slice/layoutSlice';

// Antd
const {Title, Paragraph} = Typography;
const {Panel} = Collapse;
const {Option} = Select;

// Services
import * as projectServices from 'services/project';

// Typings
import {IProject} from 'typings/project';

// Constants
import {API_TYPES, initialProject} from 'constants/project';
import {platforms} from 'constants/index';

// Helpers
import {handelError} from 'helpers';

interface GeneralSettingProps {
    project: IProject,
    onReload: Function
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const GeneralSetting: React.FC<GeneralSettingProps> = ({project, onReload}) => {
    const {name, id, active, createUser} = project;
    const user = useSelector(selectUser);
    // State
    const [isLoading, setLoading] = useState(false);

    // Form 
    const [form] = Form.useForm();
 
    const layout = {
        labelCol: {span: 12},
        wrapperCol: {span: 12}
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!'
        },
        number: {
            range: '${label} must be between ${min} and ${max}'
        }
    };
    /* eslint-enable no-template-curly-in-string */

    useEffect(() => {
        if (Object.keys(project).length) {
            form.setFieldsValue({
                project: {
                    name: project.name,
                    platform: project.platform,
                    id: project.id
                }
            });
        }
    }, [project]);

    const setStatusProject = async () => {
        setLoading(true);
        try {
            const responseUpdate = await projectServices.update({
                type:API_TYPES.SET_STATUS, 
                project: {
                    id,
                    active: !active
                }
            });

            if (responseUpdate && responseUpdate.data) {
                const {status} = responseUpdate.data;

                if (status) {
                    notification.success({
                        description: 'Change status project',
                        message: 'Change status project success'
                    });

                    onReload();
                }
            }
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    const onClickCopyProjectId = () => {
        const inputEl = document.getElementById('project-id-input');

        inputEl && (inputEl as any).select();
        document.execCommand('copy');
       
    };

    return (
        <Spin spinning={isLoading}>
            <Title level={4}>General Setting</Title>
            <Collapse defaultActiveKey={['project-details', 'project-adminstration']} collapsible='header'>
                <Panel  showArrow={false} header="Project details" key="project-details">
                    <Form
                        name='form-update-info'
                        {...layout}
                        labelAlign='left'
                        validateMessages={validateMessages}
                        form={form}
                    >
                        <Form.Item 
                            name={['project', 'id']}
                            label={<div className='form__label'>Project id</div>}
                            rules={[{required: true}]}
                        >
                            <Input id='project-id-input' readOnly placeholder='Project name'  size='large' suffix={<Tooltip title='Copy project code'><i className='icon-hvh-copy c-p' onClick={onClickCopyProjectId} /></Tooltip>} />
                        </Form.Item> 
                        <Form.Item
                            name={['project', 'platform']}
                            label={<div className='form__label'>Platform</div>}
                            rules={[{required: true}]}
                        >
                            <Select disabled placeholder='Platform' size='large'>
                                {platforms && platforms.length ? platforms.map(platform => {
                                    return (
                                        <Option className='platform__option' value={platform.key} key={platform.key}>
                                            <img src={platform.logo} width='25px' height='auto' alt="" />
                                            <span>{platform.label}</span>
                                        </Option>
                                    );
                                }) : null}
                            </Select>
                        </Form.Item> 
                        <Form.Item 
                            name={['project', 'name']}
                            label={<div className='form__label'>Project name</div>}
                            rules={[{required: true}]}
                        >
                            <Input disabled placeholder='Project name'  size='large' />
                        </Form.Item>    
                    </Form>
                </Panel>
                <Panel showArrow={false} header="Project adminstration" key="project-adminstration">
                    <Row >
                        <Col xs={{span: 24}} md={{span: 12}}>
                            <Title level={5}>Hide project</Title>
                            <Paragraph>
                            Hide the {name} project and all related data.
                            </Paragraph>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 12}} className='flex a-c'>
                            <Button disabled={user.email !== createUser} onClick={setStatusProject} danger={active} type='primary' size='large'>{active ? 'Hide Project' : 'Active project'}</Button>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </Spin>
    );
};

GeneralSetting.defaultProps = {
    project: initialProject,
    onReload: () => {}
};

export default GeneralSetting;