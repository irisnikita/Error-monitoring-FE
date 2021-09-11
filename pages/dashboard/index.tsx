// Libraries
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Typography, Spin, Steps, Form, Input, Select, Button, notification} from 'antd';
import moment from 'moment';
import {useRouter} from 'next/router';
// import {Steps as IntroSteps} from 'intro.js-react';
// Redux toolkit
import {selectUser, setUser} from 'slice/layoutSlice';

// Components
import Layout from 'components/Layout';

// Antd
const {Title, Paragraph} = Typography;
const {Step} = Steps;
const {Option} = Select;

// Variables
import {platforms} from 'constants/index';

// Services
import * as projectServices from 'services/project';
import * as userServices from 'services/user';

interface DashboardProps {
    
}

const introSteps = [
    {
        element: '#organization-input',
        intro: 'test 1',
        position: 'right'
    },
    {
        element: '#main-platform-input',
        intro: 'test 2'
    },
    {
        element: '.rc-virtual-list-holder-inner',
        intro: 'test 2'
    }
   
];

const StepUpdateInfo = (props: any) => {
   
    const user = useSelector(selectUser);

    // Form 
    const [form] = Form.useForm();

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

    const onFinish = (params: any) => {
        if (typeof props.onFinish === 'function') {
            props.onFinish(params);
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
                name={['user', 'email']}
                label='Email'
                rules={[{required: true}]}
            >
                <Input placeholder='Email' size='large' disabled />
            </Form.Item>    
            <Form.Item 
                name={['user', 'fullName']}
                label='Full Name'
                rules={[{required: true}]}
            >
                <Input placeholder='Full Name'  size='large' disabled />
            </Form.Item>    
            <Form.Item 
                name={['user', 'organization']}
                label='Organization'
                rules={[{required: true}]}
            >
                <Input id="organization-input" placeholder='Organization'  size='large' />
            </Form.Item>    
            <Form.Item
                name={['user', 'mainPlatform']}
                label='Main platform'
                rules={[{required: true}]}
            >
                <Select id="main-platform-input" placeholder='Main platform' size='large'>
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
            <Form.Item>
                <Button type='primary' htmlType='submit' size='large' className='flex a-c'>
                    <span> Next step</span>
                    <i className='icon-hvh-circle-right ml-5' />
                </Button>
            </Form.Item>   
        </Form>
    );
};

const StepCreateProject = (props: any) => {
    const user = useSelector(selectUser);
    // Form 
    const [form] = Form.useForm();

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

    const tailLayout = {
        labelCol: {span:8},
        wrapperCol: {offset: 8, span: 16}
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

    const onFinish = (params: any) => {
        if (typeof props.onFinish === 'function') {
            props.onFinish(params);
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
                label='Platform'
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
                label='Project name'
                rules={[{required: true}]}
            >
                <Input placeholder='Project name'  size='large' />
            </Form.Item>    
            <Form.Item>
                <Button type='primary' htmlType='submit' size='large'>
                    <span> Finish</span>
                </Button>
                <Button type='default' onClick={() => {typeof props.onBackStep === 'function' && props.onBackStep() }} size='large' className='ml-10'>
                    <i className='icon-hvh-circle-left mr-5' />
                    <span> Previous step</span>
                </Button>
            </Form.Item>
        </Form>
    );
};

const StepDone = (props: any) => {
    return (
        <div>
            <Title level={2}>Update information and create project success!</Title>
            <Paragraph>Thanks you for use our application! Please flow to the guide to config error tracking in your application.</Paragraph>
            <Button type='primary' size='large' onClick={() => {typeof props.onclickToDashboard === 'function' && props.onclickToDashboard()}}>
                <span>Go to dashboard</span>
                <i className='icon-hvh-circle-right ml-5' />
            </Button>

        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = () => {
    // let IntroSteps: any = () => <></>;

    // if ((process as any).browser) {
    //     IntroSteps = require('intro.js-react').Steps;
    // }

    // Redux
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const router = useRouter();
    
    // User
    const {organization = ''} = user;

    // State
    const [userUpdate, setUserUpdate] = useState({});
    const [createdProject, setCreatedProject] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isFinishStep, setFinishStep] = useState(false);

    const validateUser = async () => {
        const validateResponse = await userServices.get();

        if (validateResponse && validateResponse.data) {
            const {data, status} = validateResponse.data;

            if (status) {
                dispatch(setUser({...data}));
                if (router.route === '/') {
                    router.push('/dashboard/issues');
                }
            } else {
                router.push('/');
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                }
            }
        }
    };

    const [steps, setSteps] = useState([
        {key: 'update', label: 'Update information', status: '', component: <StepUpdateInfo onFinish={onFinishFormUpdate} />},
        {key: 'create-project', label: 'Create Project', component: <StepCreateProject  onBackStep={onBackStepCreatePrj} onFinish={onFinishFormCreateProject} />},
        {key: 'done', label: 'Done', component: <StepDone onclickToDashboard={() => {
            validateUser();
            setFinishStep(true);
        }} />}
    ]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (organization !== '') {
            setFinishStep(true);
            router.push('/dashboard/issues');
        } 

    }, [organization]);

    useEffect(() => {
        if (Object.keys(createdProject).length) {
            finishUpdate();
        }
    }, [createdProject]);

    const finishUpdate = async () => {
        try {
            setLoading(true);

            let draftUser = {...user};

            delete draftUser.password;

            const responseUpdate = await userServices.update({
                type: 'update',
                user: {
                    ...draftUser,
                    organization: (userUpdate as any).organization,
                    mainPlatform:  (userUpdate as any).mainPlatform
                }
            });
        
            if (responseUpdate  && responseUpdate.data) {
                const {status} = responseUpdate.data;

                if (status) {
                    const responseCreateProject = await projectServices.create({
                        type: 'create-project',
                        project: {
                            name: (createdProject as any).name,
                            platform: (createdProject as any).platform,
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
                            'autoSuggestPerson': false,
                            'autoSuggestSolution': false,
                            'enableMailNotification': false,
                            'createTime': moment().format(),
                            'createUser': user.email,
                            'envList': ['development', 'staging', 'production'],
                            'active':true
                        }
                    });

                    if (responseCreateProject && responseCreateProject.data) {
                        const {status} = responseCreateProject.data;
                
                        if (status) {
                            setCurrentStep(currentStep + 1);
                        }
                    }
                }
            }

            setLoading(false);
        } catch (error) {
            notification['error']({
                message: 'Request error',
                description: 'Request to server is error. Please try a later!',
                placement: 'topLeft'
            });

            setLoading(false);
        }
    };   

    function onFinishFormUpdate(params: any) {
        setUserUpdate(params.user);
        setCurrentStep(currentStep + 1);
    }

    function onFinishFormCreateProject(params:any) {
        setCreatedProject(params.project);
    }

    function onBackStepCreatePrj() {
        setCurrentStep(0);
    }

    return (
        <Layout isDashboard = {organization !== ''}>
            {organization === '' && !isFinishStep ? (
                <Spin spinning={isLoading}> 
                    <div className="section dashboard">
                        <div className="container">
                            <Steps current={currentStep}>
                                {steps && steps.length ? steps.map(step => {
                                    return (
                                        <Step
                                            key={step.key}
                                            title={step.label}
                                        />
                                    );
                                }) : null}
                            </Steps>
                            <div className="step-content">
                                {steps[currentStep] ?  steps[currentStep].component : null}
                            </div>
                        </div>
                    </div>
                </Spin>
            ) : (
                <div>Null</div>
            )}
        </Layout>
    );
};

export default Dashboard;