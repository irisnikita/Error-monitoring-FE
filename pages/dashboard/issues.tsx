// Libraries
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Typography, Spin, Steps, Form, Input, Select, Button, notification} from 'antd';
import moment from 'moment';
// Redux toolkit
import {selectUser, setUser} from 'slice/layoutSlice';

// Components
import Layout from 'components/Layout';

interface IssuesProps {
    
}

const Issues: React.FC<IssuesProps> = () => {
  
    return (
        <Layout isDashboard>
          Issues
        </Layout>
    );
};

export default Issues;