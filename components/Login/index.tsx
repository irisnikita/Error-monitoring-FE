/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useState, useEffect} from 'react';
import {Button, Form, Input, Row, Col, notification} from 'antd';
import {GoogleLogin} from 'react-google-login';
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';

// Services
import * as userServices from 'services/user';

// Styles
import styles from './styles.module.scss';

// Layout slice
import {selectEmailRegister, setUser} from 'slice/layoutSlice';
import Link from 'next/link';

// Types
interface LoginProps {
}

type TUser = {
    email: String,
    fullname: String,
    password: String
}

// Utils
import {userTypeApi} from 'constants/index';

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */
const Login: React.FC<LoginProps> = () => {
    // State
    const [isLoadingLogin, setLoadingLogin] = useState(false);
    const [form] = Form.useForm();
    const emailRegister = useSelector(selectEmailRegister);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (emailRegister !== '') {
            form.setFieldsValue({
                email: emailRegister
            });
        }
    }, [emailRegister]);

    // Form config
    const layout = {
        labelCol: {span: 24},
        wrapperCol: {span: 24}
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

    const responseGoogle = async (params: any) => {
        const {givenName = '', email = ''} = params.profileObj;
        const password = email + givenName;

        setLoadingLogin(true);

        try {
            const userResponse = await userServices.create({
                type: userTypeApi.LOGIN,
                user: {
                    
                }
            });

            if (userResponse && userResponse.data) {
                const {status, message, data} = userResponse.data;

                if (status) {
                    notification.success({
                        message: 'Login',
                        description: message,
                        placement: 'bottomLeft'
                    });

                } else {
                    notification.error({
                        message: 'Login',
                        description: message,
                        placement: 'bottomLeft'
                    });
                }

                dispatch(setUser({...data}));
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }

            }

            setLoadingLogin(false);
        } catch (e) {
            notification['error']({
                message: 'Request error',
                description: 'Request to server is error. Please try a later!',
                placement: 'topLeft'
            });

            setLoadingLogin(false);
        }
    };

    const onFinishForm = async(params: Record<string, TUser>) => {
        const {user = {}} = params;

        setLoadingLogin(true);

        try {
            const userResponse = await userServices.create({
                type: userTypeApi.LOGIN,
                user
            });

            if (userResponse && userResponse.data) {
                const {status, message, data} = userResponse.data;

                if (status) {
                    notification.success({
                        message: 'Login',
                        description: message,
                        placement: 'bottomLeft'
                    });

                    router.push('/dashboard');

                } else {
                    notification.error({
                        message: 'Login',
                        description: message,
                        placement: 'bottomLeft'
                    });
                }

                dispatch(setUser({...data}));
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
            }

            setLoadingLogin(false);
        } catch (e) {
            notification['error']({
                message: 'Request error',
                description: 'Request to server is error. Please try a later!',
                placement: 'topLeft'
            });

            setLoadingLogin(false);
        }
    };

    return (
        <div className={styles['login-block']}>
            <Form  
                {...layout}
                form={form} 
                name="log-in"
                validateMessages={validateMessages}
                onFinish={onFinishForm}
            >
                <Form.Item
                    label="Email"
                    name={['user', 'email']}
                    rules={[
                        {required: true}
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name={['user', 'password']}
                    rules={[
                        {required: true}
                    ]}
                >
                    <Input.Password size="large" />
                </Form.Item>
                <Row gutter={[10, 10]}>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item>
                            <Button loading={isLoadingLogin} size="large" type="primary" htmlType="submit" block>
                                    Login
                            </Button>
                        </Form.Item>            
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}} className="text-right">
                        <Form.Item>
                            <Link href='/forgot-password'>
                                <a>Lost your password?</a>
                            </Link>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <GoogleLogin
                clientId="801385582850-13insi815a56hte71ge0s3i3107nqt43.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={props => (
                    <Button loading={isLoadingLogin} block size='large' type='primary' danger icon={<i className='icon-hvh-google mr-5' />} onClick={props.onClick} disabled={props.disabled}>
                        Sign in with google
                    </Button>
                )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Login;