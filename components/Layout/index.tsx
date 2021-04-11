/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React from 'react';
import {Layout} from 'antd';

// Type
interface DefaultLayoutProps {
    isDashboard?: boolean
}

// Components
import Header from './Components/Header';

// Ant design
const {Content} = Layout;

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