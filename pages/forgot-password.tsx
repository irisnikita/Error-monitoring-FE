/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useState} from 'react';
import {Form, Input, Typography, Button, Divider, notification} from 'antd';
import {useRouter} from 'next/router';

// Services
import * as userServices from 'services/user';

// Antd
const {Title, Paragraph} = Typography;

// Type
interface ForgotPasswordProps {
    
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    // Variables
    const [form] = Form.useForm();
    const router = useRouter();

    // State
    const [isCodeSend, setCodeSend] = useState(false);
    const [isLoading, setLoading] = useState(false);  
    const [user, setUser] = useState({
        code: '',
        email: '',
        token: ''
    });
    const [userUpdate, setUserUpdate] = useState({
        avatar: '',
        email: '',
        fullName: '',
        mainPlatform: '',
        organization: '',
        password: '',
        position: '',
        projectList: null
    });

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!'
    };
    /* eslint-enable no-template-curly-in-string */

    // Form config
    const layout = {
        labelCol: {span: 24},
        wrapperCol: {span: 24}
    };

    const onFinishForm = async (params: any) => {
        const {email} = params;

        if (!isCodeSend) {
            try {
                setLoading(true);

                const sendCodeResponse =  await userServices.create({
                    type: 'forgot-password',
                    user: {
                        email
                    }
                });
                
                if (sendCodeResponse && sendCodeResponse.data) {
                    const {data, message, status} = sendCodeResponse.data;

                    if (status) {
                        notification['success']({
                            message: 'Recover Account',
                            description: 'Send code success, please check email and input to change password!',
                            placement: 'topLeft'
                        });

                        setUser({...data});
                        setCodeSend(true);

                        const userUpdateResponse  = await userServices.get({
                            token: data.token
                        });

                        if (userUpdateResponse && userUpdateResponse.data) {
                            const {data} = userUpdateResponse.data;

                            setUserUpdate({...data});
                        }
                    } else {
                        notification.error({
                            message: 'Login',
                            description: message,
                            placement: 'topLeft'
                        });
                    }

                    setLoading(false);

                } 
                
            } catch (error) {
                notification['error']({
                    message: 'Request error',
                    description: 'Request to server is error. Please try a later!',
                    placement: 'topLeft'
                });
    
                setLoading(false);
                
            }

        }
        
    };

    const onFinishRenewPass = async (params: any) => {
        try {
            setLoading(true);
            
            const userResponseUpdate = await userServices.update({
                type: 'update',
                token: user.token,
                user: {
                    ...userUpdate,
                    password: params.user.password
                }
            });
    
            if (userResponseUpdate && userResponseUpdate.data ) {
                const {data, status, message} = userResponseUpdate.data;

                if (status) {
                    notification['success']({
                        message: 'Recover Account',
                        description: 'Recover password success!',
                        placement: 'topLeft'
                    });
                } else {
                    notification.error({
                        message: 'Login',
                        description: message,
                        placement: 'topLeft'
                    });
                }

                setLoading(false);
                router.push('/');
            }
    
        } catch (error) {
            notification['error']({
                message: 'Request error',
                description: 'Request to server is error. Please try a later!',
                placement: 'topLeft'
            });

            setLoading(false);
        }
    };

    return (
        <div className='section'>
            <div className='container'>
                <div className="form-wrapper">
                    <div className='form__content'>
                        <img width={80} src="images/logo/logo-hvh.png" alt="logo hvh" />
                        <Divider />
                        <Title level={3}>Recover Account</Title>
                        {!isCodeSend ? (
                            <>  
                                <Paragraph>We will send a email include code to this address:</Paragraph>
                                <Form
                                    {...layout}
                                    validateMessages={validateMessages}
                                    name='forgot-pass'
                                    form={form}
                                    onFinish={onFinishForm}
                                >
                                    {!isCodeSend ? (
                                        <>
                                            <Form.Item
                                                name='email'
                                                rules={[{required: true, message: 'Email is required!'}, {type: 'email', message: 'Invalid email!'}]}
                                            >
                                                <Input size='large' placeholder='Your email' />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button loading={isLoading} type='primary' htmlType='submit'>Send email</Button>
                                            </Form.Item>
                                        </>
                                    ) : (
                                        <div />
                                    )}
                                </Form>
                            </>

                        ) : (
                            <div>
                                <Paragraph>Please input your new password </Paragraph>
                                <Form
                                    {...layout}
                                    name='renew-password'
                                    form={form}
                                    validateMessages={validateMessages}
                                    onFinish={onFinishRenewPass}
                                >
                                    <Form.Item
                                        label="Password"
                                        name={['user', 'password']}
                                        rules={[
                                            {required: true}
                                        ]}
                                    >
                                        <Input.Password size="large" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Confirm password"
                                        name={['user', 'confirm-password']}
                                        rules={[
                                            {required: true},
                                            ({getFieldValue}) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue(['user', 'password']) === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                }
                                            })
                                        ]}
                                    >
                                        <Input.Password size="large" />
                                    </Form.Item>
                                    <Form.Item 
                                        name={['user', 'code']}
                                        label='Code'
                                        rules={[
                                            () => ({
                                                validator(_, value) {
                                                    if (+value === +user.code) {
                                                        return Promise.resolve();
                                                    }

                                                    return Promise.reject(new Error('Code is not valid!'));
                                                }
                                            })
                                        ]}
                                    >
                                        <Input size="large" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button loading={isLoading} type='primary' htmlType='submit'>Update password</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
       
    );
};

export default ForgotPassword;