/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API: "https://dummyjson.com",
        NEXTAUTH_SECRET: "12345"
    }
};

export default nextConfig;
