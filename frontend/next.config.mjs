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
        },
        {
            source: '/dashboard',
            destination: '/dashboard/games',
            permanent: true
        }
    ]
};

export default nextConfig;
