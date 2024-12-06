/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => [
        {
            source: '/g',
            destination: '/games',
            permanent: true
        },
        {
            source: '/u',
            destination: '/',
            permanent: true
        }
    ]
};

export default nextConfig;
