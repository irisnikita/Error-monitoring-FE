/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React from 'react';
import {Row, Col, Typography, Button} from 'antd';
import {useDispatch} from 'react-redux';

// Redux toolkit
import {setTryFree} from 'slice/layoutSlice';

// Components
import Layout from 'components/Layout';

// Type
interface HomeProps { }

// Antd
const {Title, Paragraph} = Typography;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const Home: React.FC<HomeProps> = () => {
    const dispatch = useDispatch();

    const onClickTryFree = () => {
        dispatch(setTryFree(true));
    };

    return (
        <Layout>
            <div className="section hero-branding">
                <div className="container">
                    <Row gutter={10}>
                        <Col xs={{span: 24}} md={{span: 12}} />
                        <Col xs={{span: 24}} md={{span: 12}} >
                            <Title style={{color: '#fff'}}>Working Code, Happy Customers</Title>
                            <Paragraph style={{color: '#fff'}}>
                            EM&apos;s application monitoring platform helps every developer
diagnose, fix, and optimize the performance of their code.
                                <br />
                                <br />

Over 1M developers and 70K organizations already ship better
software faster with Sentry. Won’t you join them?
                            </Paragraph>
                            <div className='mt-20'>
                                <Button type='primary' shape='round' size='large' onClick={onClickTryFree}>Try EM for free</Button>
                                <Button type='dashed' danger shape='round' size='large' className='ml-10'>Request a demo</Button>
                        
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
