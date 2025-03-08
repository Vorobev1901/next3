/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        additionalData: `$var: red;`,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'mokky.dev',
                port: '',
                pathname: '/uploaded/**',
            },
        ],
    },
}

export default nextConfig
