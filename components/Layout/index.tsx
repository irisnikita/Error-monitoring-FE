/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React from 'react';
import {Layout} from 'antd';

// Styles
import styles from './styles.module.scss';

// Type
interface DefaultLayoutProps {
    isDashboard?: boolean
}

// Components
import Header from './Components/Header';

// Ant design
const {Content, Footer} = Layout;

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */
const DefaultLayout: React.FC<DefaultLayoutProps> = ({children}) => {
   
    return (
        <div>
            <Layout>
                <Header />
                <Content>
                    {children}
                </Content>
            </Layout>
        </div>
    );
};

export default DefaultLayout;