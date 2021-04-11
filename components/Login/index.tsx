/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React from 'react';
import {Button, Form, Input, Row, Col} from 'antd';
import {GoogleLogin} from 'react-google-login';

// Styles
import styles from './styles.module.scss';

// Types
interface LoginProps {
    
}

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */
const Login: React.FC<LoginProps> = () => {

    // Form config
    const layout = {
        labelCol: {span: 24},
        wrapperCol: {span: 24}
    };

    const responseGoogle = (params: any) => {
        console.log('🚀 ~ file: index.tsx ~ line 29 ~ responseGoogle ~ params', params);
    };

    return (
        <div className={styles['login-block']}>
            <Form  
                {...layout}
                name="log-in"
                    
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {required: true, message: 'Please input your email!'}
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: 'Please input your password!'}
                    ]}
                >
                    <Input.Password size="large" />
                </Form.Item>
                <Row gutter={[10, 10]}>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" block>
                                    Login
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}} className="text-right">
                        <Form.Item>
                            <a href="">Lost your password?</a>
                        </Form.Item>
                    </Col>
                </Row>
                
            </Form>
            <GoogleLogin
                clientId="801385582850-13insi815a56hte71ge0s3i3107nqt43.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />,    
        </div>
    );
};

export default Login;