/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Header
import React, {useEffect, useState} from 'react';
import {Row,Breadcrumb, Col, Form, Button, Input, Select, Typography, notification} from 'antd';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useRouter} from 'next/router';
import Link from 'next/link';

// Redux toolkit
import {selectUser} from 'slice/layoutSlice';

// Components
import Layout from 'components/Layout';

// Helpers
import {handelError} from 'helpers';

// Interface
interface CreateProps {
    
}

// Services
import * as projectServices from 'services/project';

// Constant
import {platforms} from 'constants/index';

// Antd
const {Option} = Select;
const {Title, Text} = Typography;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const CreateProjectForm = (props: any) => {
    const router = useRouter();
    const user = useSelector(selectUser);
    // Form 
    const [form] = Form.useForm();

    // state
    const [isLoading, setLoading] = useState(false);

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

    const layout = {
        labelCol: {span: 24},
        wrapperCol: {span: 24}
    };

    useEffect(() => {
        if (Object.keys(user).length) {
            form.setFieldsValue({
                user: {
                    email: user.email,
                    fullName: user.fullName
                }
            });
        }
    }, [user]);

    const onFinish = async (params: any) => {
        const {name, platform} = params.project;

        setLoading(true);
        try {
            const responseCreateProject = await projectServices.create({
                type: 'create-project',
                project: {
                    name: name,
                    platform: platform,
                    'userList': [],
                    'enableTrello': false,
                    'trelloInfo': {
                        'appToken':'',
                        'userId':'',
                        'boardId':'',
                        'listId':''
                    },
                    'enableSlack':false,
                    'slackInfo':{
                        'botToken':'',  
                        'chanelId':''
                    },
                    'issues': [],
                    'createTime': moment().format(),
                    'autoSuggestPerson': false,
                    'autoSuggestSolution': false,
                    'enableMailNotification': false,
                    'createUser': user.email,
                    'envList': ['development', 'staging', 'production'],
                    'active':true
                }
            });

            if (responseCreateProject && responseCreateProject.data) {
                const {status} = responseCreateProject.data;

                if (status) {
                    notification.success({
                        description: 'Create project',
                        message: 'Create project success'
                    });
                }

                router.push('/dashboard/projects');
            }
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            onFinish={onFinish}
            name='form-update-info'
            {...layout}
            validateMessages={validateMessages}
            form={form}
        >
            <Form.Item
                name={['project', 'platform']}
                label={<div className='form__label'>Platform</div>}
                rules={[{required: true}]}
            >
                <Select placeholder='Platform' size='large'>
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
                <Input placeholder='Project name'  size='large' />
            </Form.Item>    
            <Form.Item>
                <Button loading={isLoading} type='primary' htmlType='submit' size='large'>
                    <span> Create Project</span>
                </Button>
            </Form.Item>
        </Form>
    );
};

const Create: React.FC<CreateProps> = () => {
    return (
        <Layout isDashboard>
            <Breadcrumb className='mb-20'>
                <Breadcrumb.Item >
                    <Link href='/dashboard/projects'>Projects</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                Create project
                </Breadcrumb.Item>
            </Breadcrumb>
            <Title level={4} className='projects-title'>Create project</Title>
            <div className='mt-5'>
                <Text type="secondary">Projects allow you to scope error and transaction events to a specific application in your organization.</Text> <br />
                <Text type="secondary">For example, you might have separate projects for your API server and frontend client.</Text>
        
            </div>
            <Row className='mt-20'>
                <Col md={{span:12}} xs={{span: 24}}>
                    <CreateProjectForm />
                </Col>
            </Row>
        </Layout>
    );
};

export default Create;