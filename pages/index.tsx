/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React from 'react';
import {Row, Col, Typography} from 'antd';

// Components
import Layout from 'components/Layout';

// Type
interface HomeProps { }

// Antd
const {Title} = Typography;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const Home: React.FC<HomeProps> = () => {
    return (
        <Layout>
            <div className="section hero-branding">
                <div className="container">
                    <Row gutter={10}>
                        <Col xs={{span: 24}} md={{span: 12}} />
                        <Col xs={{span: 24}} md={{span: 12}}>
                            <Title style={{color: '#fff'}}>Hello</Title>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
