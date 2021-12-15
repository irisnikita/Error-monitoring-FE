// const withMDX = require('@next/mdx')();

// module.exports = withMDX({
//     images: {
//         domains: ['strapi.vinlt.xyz', 'blog-cms.vinlt.xyz']
//     },
//     webpack: (config, {isServer}) => {
//         if (!isServer) {
//             // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
//             config.resolve.fallback = {
//                 fs: false,
//                 path: false
//             };
//         }

//         return config;
//     },
//     typescript: {
//         // !! WARN !!
//         // Dangerously allow production builds to successfully complete even if
//         // your project has type errors.
//         // !! WARN !!
//         ignoreBuildErrors: true
//     },
//     pageExtensions: ['js', 'mdx', 'jsx']
// });
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: []
    }
});

module.exports = withMDX({
    async redirects() {
        return [
            {
                source: '/dashboard/documents/',
                destination: '/',
                permanent: true
            }
        ];
    },
    webpack: (config, {isServer}) => {
        if (!isServer) {
            // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = {
                fs: false,
                path: false
            };
        }

        return config;
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true
    },
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
});

// module.exports = {
//     typescript: {
//         // !! WARN !!
//         // Dangerously allow production builds to successfully complete even if
//         // your project has type errors.
//         // !! WARN !!
//         ignoreBuildErrors: true
//     }
// };
