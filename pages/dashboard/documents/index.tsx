// Libraries
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';

// Components
import Layout from 'components/Layout';
import {getAllDocumentSlug} from 'helpers/mdx';

interface DocumentsPageProps {
    slugs: any
}

export async function getStaticProps() {
    const slugs =  getAllDocumentSlug();

    return {
        props: {
            slugs
        } // will be passed to the page component as props
    };
}

const DocumentsPage: React.FC<DocumentsPageProps> = ({slugs}) => {
    const router = useRouter();

    useEffect(() => {
        if (slugs && slugs.length) {
            router.push(`/dashboard/documents/${slugs[0]}`);
        }
    }, [slugs]);

    return (
        <Layout isDashboard />
    );
};

export default DocumentsPage;