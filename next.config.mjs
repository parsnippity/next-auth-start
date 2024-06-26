/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify:true,
    images:{
        remotePatterns:[
        {
            hostname:'images.unsplash.com',
            hostname:'res.cloudinary.com'
        }
        ]
    }
};

export default nextConfig;
