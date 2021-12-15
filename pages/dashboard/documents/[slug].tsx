// Libraries
import React from 'react';

// Components
import Documents from 'components/Documents';
import Layout from 'components/Layout';
import {getAllDocumentPaths, getAllDocumentSlug, getDocumentData, getDocumentMenus} from 'helpers/mdx';
import matter from 'gray-matter';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

// Remark
import remarkSlug from 'remark-slug';
import remarkPrism from 'remark-prism';

interface DocumentsPageProps {
    menus: any,
    documentInfo: any,
    documentContent: any
}

export async function getStaticProps(props: any) {
    const {params = {}} = props;
    const menus =  getDocumentMenus();
    const mdxData = getDocumentData(params.slug);

    const {data, content} = matter(mdxData);

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [remarkPrism, remarkSlug as any],
            rehypePlugins: []
        },
        scope: data
    });

    return {
        props: {
            documentContent: mdxSource,
            documentInfo: data,
            menus
        } // will be passed to the page component as props
    };
}

export async function getStaticPaths() {
    const paths = getAllDocumentPaths();

    return {
        paths: paths,
        fallback: false // See the "fallback" section below
    };
}

const DocumentsPage: React.FC<DocumentsPageProps> = ({menus, documentInfo, documentContent}) => {
    return (
        <Layout isDashboard>
            <Documents menus={menus} documentInfo={documentInfo} documentContent={documentContent} />
        </Layout>
    );
};

export default DocumentsPage;