import fs from 'fs';
import path from 'path';
import moment from 'moment';
import matter from 'gray-matter';

// Finding directory named "posts" from the current working directory of Node.

export const getAllDocumentInfo = () => {
    const nestjsSharingDirectory = path.join(process.cwd(), 'documents');

    const fileNames = fs.readdirSync(nestjsSharingDirectory);

    const documents = fileNames.map(fileName => {
        const fileContents = fs.readFileSync(path.join(nestjsSharingDirectory, fileName));

        const {data} = matter(fileContents);
        const slug = fileName.replace('.mdx', '');

        return {...data, menu: {...data.menu, slug}, slug};
    });

    return documents;
};

export const getDocumentMenus = () => {
    return getAllDocumentInfo().map(document => ({
        ...document.menu
    }));
};

export const getAllDocumentSlug = () => {
    const nestjsSharingDirectory = path.join(process.cwd(), 'documents');

    const fileNames = fs.readdirSync(nestjsSharingDirectory);
    const paths: any = [];
     
    fileNames.map((fileName) => {
        if (fileName !== 'index.mdx') {
            paths.push(fileName.replace('.mdx', ''));
        }
    });

    return paths;
};

export const getAllDocumentPaths = () => {
    return getAllDocumentSlug().map((path: string) => ({
        params: {slug: path}
    }));
};

export const getSharing = () => {
    const nestjsSharingDirectory = path.join(process.cwd(), 'sharing', 'nestjs');

    const fileNames = fs.readdirSync(nestjsSharingDirectory);

    const allNestjsSharingData = fileNames.map((filename) => {
        const slug = filename.replace('.mdx', '');

        const fullPath = path.join(nestjsSharingDirectory, filename);

        // Extracts contents of the MDX file
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const {data} = matter(fileContents);

        return {
            slug,
            data: {
                ...data,
                date: moment(data.moment, 'DD-MM-YYYY').locale('vi').format('LLL')
            }
        };
    });
};

// Get Post based on Slug
export const getDocumentData = (slug: any) => {
    const nestjsSharingDirectory = path.join(process.cwd(), 'documents');
    const fileContents = fs.readFileSync(
        path.join(nestjsSharingDirectory, `${slug}.mdx`),
        'utf8'
    );

    const {data} = matter(fileContents);
    const fullPath = path.join(nestjsSharingDirectory, `${slug}.mdx`);
    const content = fs.readFileSync(fullPath, 'utf8');

    return {
        date: data.date,
        title: data.title,
        author: data.author,
        description: data.description,
        menu: data.menu,
        content
    };
};
