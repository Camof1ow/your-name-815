// next.config.mjs
export default {
    env: {
        BE_API_URL: process.env.BE_API_URL,
        BE_BASE_URL: process.env.BE_BASE_URL,
    },
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/backend/api/:path*',
                destination: `${process.env.BE_API_URL}/:path*`,
            },
        ];
    }
};
