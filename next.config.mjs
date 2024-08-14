// next.config.mjs
export default {
    env: {
        BE_API_URL: process.env.BE_API_URL,
    },
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.BE_API_URL}/:path*`,
            },
        ];
    }
};
