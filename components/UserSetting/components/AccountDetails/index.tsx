// Libraries
import React, {useEffect, useState} from 'react';
import {Spin, Typography, Collapse, message, Row, Col,Upload , Form, Input, Select, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {platforms} from 'constants/index';
import isEqual from 'lodash/isEqual';
import ImgCrop from 'antd-img-crop';

import styles from './styles.module.scss'; 

// Slice
import {selectUser, setUser} from 'slice/layoutSlice';
// Services
import * as userServices from 'services/user';
import {handelError} from 'helpers';
import {uploadImage} from 'services/upload';

// Antd
const {Title} = Typography;
const {Panel} = Collapse;
const {Option} = Select;

interface AccountDetailsProps {
  
}

// function getBase64(img: any, callback: any) {
//     const reader = new FileReader();

//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

const AccountDetails: React.FC<AccountDetailsProps> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // Form 
    const [form] = Form.useForm();

    const layout = {
        labelCol: {span: 12},
        wrapperCol: {span: 12}
    };

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
    
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    useEffect(() => {
        if (Object.keys(user).length) {
            form.setFieldsValue({
                user: {
                    ...user,
                    'email': user.email,
                    'position': user.position,
                    'fullName': user.fullName,
                    'mainPlatform': user.mainPlatform
                }
            });
        }
    }, [user]);

    const onFinishForm = (value: any) => {
        console.log('🚀 ~ file: index.tsx ~ line 43 ~ onFinishForm ~ value', value);

    };

    const onBlur = async () => {
        const formUser = form.getFieldsValue(true).user;

        form.getFieldsValue(true);
        const isError = form.getFieldsError().some(fieldError => fieldError.errors.length);

        if (isError || isEqual(user, {...user, ...formUser})) {return}

        setIsLoading(true);

        try {
            const {data} = await userServices.update({
                type: 'update',
                user: {
                    ...user,
                    ...formUser
                }
            }) as any;

            if (data && data.status) {
                dispatch(setUser({...user,...formUser}));
                message.success('Update account info success');
            }
        } catch (error) {
            form.setFieldsValue({
                user: {
                    ...user,
                    'email': user.email,
                    'position': user.position,
                    'fullName': user.fullName,
                    'mainPlatform': user.mainPlatform
                }
            });
            handelError();
            
        } finally {
            setIsLoading(false);
        }
    };

    const customRequest = async (options: any) => {
        const {onSuccess, onError, file} = options;

        const formData = new FormData();

        formData.append('image', file);

        setIsLoadingAvatar(true);
        try {
            const {data} = await uploadImage({
                formData,
                key: 'c4d0562611183c8c0c106d886136d547'
            }) as any;
            
            if (data && data.data && data.data.url) {
                const {url} = data.data;

                await userServices.update({
                    type: 'update',
                    user: {
                        ...user,
                        avatar: url
                    }
                });

                dispatch(setUser({
                    ...user,
                    avatar: url
                }));

                onSuccess('Ok');
                message.success('Update avatar success');
            }
        } catch (error) {
            handelError();
            onError({error});
        } finally {
            setIsLoadingAvatar(false);
        }
    };

    return (
        <Spin spinning={isLoading}>
            <Title level={4}>Account details</Title>
            <Collapse defaultActiveKey={['account-info', 'account-avatar']} collapsible='header'>
                <Panel showArrow={false} header="Account info" key="account-info">
                    <Form
                        name='form-update-info'
                        {...layout}
                        labelAlign='left'
                        form={form}
                        requiredMark={false}
                        onBlur={onBlur}
                        onFinish={onFinishForm}
                    >
                        <Form.Item 
                            name={['user', 'email']}
                            label={<div className='form__label'>Email</div>}
                            rules={[{required: true, message: 'Email is required!'}]}
                        >
                            <Input disabled placeholder='Email' size='large' />
                        </Form.Item> 
                        <Form.Item 
                            name={['user', 'fullName']}
                            label={<div className='form__label'>Full name</div>}
                            rules={[{required: true, message: 'Full name is required!'}]}
                        >
                            <Input placeholder='Full name' size='large' />
                        </Form.Item> 
                        <Form.Item 
                            name={['user', 'position']}
                            label={<div className='form__label'>Position</div>}
                        >
                            <Input placeholder='Position' size='large' />
                        </Form.Item> 
                        <Form.Item
                            name={['user', 'mainPlatform']}
                            label={<div className='form__label'>Main platform</div>}
                            rules={[{required: true, message: 'Main platform is required!'}]}
                        >
                            <Select placeholder='Main platform' size='large'>
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
                    </Form>
                </Panel>
                <Panel showArrow={false} header="Account avatar" key="account-avatar">
                    <Spin spinning={isLoadingAvatar}>
                        <ImgCrop rotate>
                            <Upload
                                listType="picture-card"
                                customRequest={customRequest}
                                className='avatar-uploader'
                                showUploadList={false}
                                // onChange={onChangeAvatar}
                            >
                                <div className='bg-hover'>Change avatar</div>
                                {user.avatar ? <img src={user.avatar} width={150} style={{objectFit: 'cover', objectPosition: 'center'}} height={150} /> : <div>No image</div>}
                            </Upload>
                        </ImgCrop>
                    </Spin>
                </Panel>
            </Collapse>
        </Spin>
    );
};

export default AccountDetails;