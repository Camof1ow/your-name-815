/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BE_API_URL: process.env.BE_API_URL,
    },
}

export default nextConfig;
