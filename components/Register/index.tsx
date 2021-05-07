/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useState} from 'react';
import {Form, Button, Input, notification} from 'antd';

// Services
import * as userServices from 'services/user';

// Styles
import styles from './styles.module.scss';

// Type
interface RegisterProps {
    callbackRegister?: (email: string) => void
}

// Utils
import {userTypeApi} from 'constants/index';

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const Register: React.FC<RegisterProps> = (props) => {
    // Props
    const {callbackRegister} = props;

    // State
    const [isLoadingRegister, setLoadingRegister] = useState(false);

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

    const onFinishForm = async (params: any) => {
        const {user = {}} = params;

        // Delete confirm password
        delete user['confirm-password'];

        setLoadingRegister(true);

        try {
            const userResponse = await userServices.create({
                type: userTypeApi.REGISTER,
                user
            });

            if (userResponse && userResponse.data) {
                const {status, message} = userResponse.data;

                if (status) {
                    notification.success({
                        message: 'Register user',
                        description: message,
                        placement: 'topLeft'
                    });

                    typeof callbackRegister === 'function' ? callbackRegister(user.email) : null;
                } else {
                    notification.error({
                        message: 'Register user',
                        description: message,
                        placement: 'topLeft'
                    });
                }
            }

            setLoadingRegister(false);
        } catch (e) {
            notification['error']({
                message: 'Request error',
                description: 'Request to server is error. Please try a later!',
                placement: 'topLeft'
            });

            setLoadingRegister(false);
        }
    };

    return (
        <div className={styles['register-block']} >
            <Form  
                {...layout}
                name="register"
                validateMessages={validateMessages}
                onFinish={onFinishForm}
            >
                <Form.Item
                    label="Full name"
                    name={['user', 'fullname']}
                    rules={[
                        {required: true}
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name={['user', 'email']}
                    rules={[{type: 'email', required: true}]}
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
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" block loading={isLoadingRegister}>
                        Register
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
};

export default Register;