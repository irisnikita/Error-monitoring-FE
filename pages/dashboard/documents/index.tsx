// Libraries
import React from 'react';

// Components
import Documents from 'components/Documents';
import Layout from 'components/Layout';

interface DocumentsPageProps {
  
}

const DocumentsPage: React.FC<DocumentsPageProps> = () => {
    return (
        <Layout isDashboard>
            <Documents />
        </Layout>
    );
};

export default DocumentsPage;