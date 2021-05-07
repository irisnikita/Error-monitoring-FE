// Libraries
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Typography, Spin, Steps, Form, Input, Select, Button, notification} from 'antd';
import moment from 'moment';
// Redux toolkit
import {selectUser, setUser} from 'slice/layoutSlice';

// Components
import Layout from 'components/Layout';

interface StatsProps {
    
}

const Stats: React.FC<StatsProps> = () => {
  
    return (
        <Layout isDashboard>
          Stats
        </Layout>
    );
};

export default Stats;